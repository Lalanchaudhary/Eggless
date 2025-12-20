import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import cake from '../assets/cake.jpg';
import { useCart } from '../context/CartContext';
import { getCakeById, addReview, getAllCakes, getCakeBySlug } from '../services/cakeServices';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { Helmet } from "react-helmet-async";
function isMongoId(value) {
  return /^[0-9a-fA-F]{24}$/.test(value);
}

const CakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [cakeData, setCakeData] = useState(null);
  const [allCakes, setAllCakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('0.5Kg');
  const { addToCart } = useCart();
  const scrollContainerRef = useRef(null);
  const [selectedFlavor, setSelectedFlavor] = useState("");

  // New state for review form and modal
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    name: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  // Fetch cake data and all cakes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all cakes first
        const allCakesData = await getAllCakes();
        setAllCakes(allCakesData);

        // Fetch specific cake data if not available from location state
        // CASE 1: Old ID URL
        if (isMongoId(id)) {
          const cake = await getCakeById(id);

          // Redirect to SEO URL
          navigate(`/cake/${cake.slug}`, { replace: true });
          return;
        }

        const cake = await getCakeBySlug(id);
        setCakeData(cake);
        if (cake.flavors && cake.flavors.length > 0) {
          setSelectedFlavor(cake.flavors[0]);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch cake details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, location.state]);

  // Get suggested cakes based on flavor, category, or tag
  const getSuggestedCakes = () => {
    if (!cakeData || !allCakes.length) return [];

    const currentCakeId = cakeData._id;

    // Filter out the current cake and get suggestions based on multiple criteria
    const suggestions = allCakes.filter(cake => {
      if (cake._id === currentCakeId) return false;

      // Check if cakes share the same flavor, category, or tag
      const sameFlavor = cake.flavor && cakeData.flavor && cake.flavor.toLowerCase() === cakeData.flavor.toLowerCase();
      const sameCategory = cake.category && cakeData.category && cake.category.toLowerCase() === cakeData.category.toLowerCase();
      const sameTag = cake.tag && cakeData.tag && cake.tag.toLowerCase() === cakeData.tag.toLowerCase();

      return sameFlavor || sameCategory || sameTag;
    });

    // If we don't have enough suggestions, add some random cakes
    if (suggestions.length < 6) {
      const remainingCakes = allCakes.filter(cake =>
        cake._id !== currentCakeId && !suggestions.find(s => s._id === cake._id)
      );

      const randomCakes = remainingCakes
        .sort(() => 0.5 - Math.random())
        .slice(0, 6 - suggestions.length);

      return [...suggestions, ...randomCakes];
    }

    // Return top 6 suggestions
    return suggestions.slice(0, 6);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!cakeData) return;

    const selectedSizeData = cakeData.sizes.find(size => size.size === selectedSize);
    if (!selectedSizeData) {
      toast.error('Please select a size');
      return;
    }

    const cartItem = {
      id: cakeData._id,
      name: cakeData.name,
      image: cakeData.image,
      price: selectedSizeData.price,
      selectedSize: selectedSizeData,
      quantity: quantity,
      totalPrice: selectedSizeData.price * quantity
    };

    addToCart(cartItem);
    const token = localStorage.getItem("token");
    if (token) {
      toast.success('Added to cart successfully!');
    } else {
      toast.error('Please login to add items to cart');
    }
  };

  // Update size selection handler
  const handleSizeSelection = (sizeId) => {
    setSelectedSize(sizeId);
    setQuantity(1); // Reset quantity when size changes
  };

  // Updated review submission handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment || !newReview.name) {
      toast.error('Please fill in all fields and select a rating');
      return;
    }

    try {
      setSubmittingReview(true);
      const reviewData = {
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment
      };

      const updatedCake = await addReview(id, reviewData);
      setCakeData(updatedCake);

      // Reset form and close modal
      setNewReview({
        rating: 0,
        comment: '',
        name: ''
      });
      setIsReviewModalOpen(false);
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again later.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !cakeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Cake not found'}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const suggestedCakes = getSuggestedCakes();

  return (
    <>
      <Helmet>
        {/* SEO Title */}
        <title>{cakeData.name} | Eggless Cakes</title>

        {/* Meta Description */}
        <meta name="description" content={cakeData.description ? cakeData.description.slice(0, 155) : `Order ${cakeData.name} online from Eggless Cakes with same-day delivery.`} />
        {/* Canonical URL */}
        <link rel="canonical" href={`https://www.egglesscakes.in/cake/${cakeData.slug}`} />

        {/* Open Graph (Social Sharing) */}
        <meta property="og:title" content={cakeData.name} />
        <meta property="og:description" content={cakeData.description} />
        <meta property="og:image" content={cakeData.image} />
        <meta property="og:url" content={`https://www.egglesscakes.in/cake/${cakeData.slug}`} />
        <meta property="og:type" content="product" />

        {/* Structured Data (Rich Results) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": cakeData.name,
            "image": cakeData.image,
            "description": cakeData.description,
            "sku": cakeData._id,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": cakeData.price || cakeData.sizes?.[0]?.price,
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": cakeData.rating
              ? {
                "@type": "AggregateRating",
                "ratingValue": cakeData.rating,
                "reviewCount": cakeData.reviews
              }
              : undefined
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Cakes
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Left Column - Image */}
              <div className="relative aspect-square">
                <img
                  src={cakeData.image}
                  alt={cakeData.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder-cake.jpg";
                  }}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                <div>
                  <div className='flex justify-between'>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {cakeData.name}
                    </h1>
                    {cakeData.flavors && cakeData.flavors.length > 0 && (
                      <div className="mb-4">
                        <select
                          value={selectedFlavor}
                          onChange={(e) => setSelectedFlavor(e.target.value)}
                          className="w-full text-[#000] border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-rose-300"
                        >
                          {cakeData.flavors.map((flavor, index) => (
                            <option key={index} value={flavor}>
                              {flavor}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>


                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(parseFloat(cakeData.rating)) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {cakeData.rating} ({cakeData.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Category and Flavor */}
                  <div className="flex gap-4 mb-3">
                    {cakeData.number && (
                      <span className="text-sm text-gray-500 capitalize">
                        Cake Number: {cakeData.number}
                      </span>
                    )}

                  </div>

                  <p className="text-gray-600">{cakeData.description}</p>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Select Size</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {cakeData?.sizes?.map((size) => (
                      <button
                        key={size.size}
                        onClick={() => handleSizeSelection(size.size)}
                        className={`p-3 rounded-lg border-2 transition-all ${selectedSize === size.size
                          ? 'border-rose-300 bg-rose-50'
                          : 'border-gray-200 hover:border-rose-200'
                          }`}
                      >
                        <div className="font-medium">{size.size}</div>
                        <div className="text-sm text-gray-600">{size.serves}</div>
                        <div className="text-rose-500 font-semibold">₹{size.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                      className="w-16 text-center border-x py-2"
                      min="1"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-rose-300 hover:bg-rose-400 text-white font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Additional Information */}
                <div className="border-t pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ingredients - Show if available */}
                    {cakeData.ingredients && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                        <ul className="list-disc list-inside text-gray-600">
                          {cakeData.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Allergens - Show if available */}
                    {cakeData.allergens && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Allergens</h3>
                        <div className="flex flex-wrap gap-2">
                          {cakeData.allergens.map((allergen, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <button
                      onClick={() => setIsReviewModalOpen(true)}
                      className="bg-rose-300 hover:bg-rose-400 text-white font-semibold px-4 py-2 rounded-lg transition"
                    >
                      Write a Review
                    </button>
                  </div>

                  {/* Existing Reviews - Show if available */}
                  {cakeData.reviewsList && Array.isArray(cakeData.reviewsList) && cakeData.reviewsList.length > 0 ? (
                    <div className="space-y-4">
                      {cakeData.reviewsList.map((review) => (
                        <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString("en-IN")}</div>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No reviews yet. Be the first to review this cake!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Cakes Section */}
          {suggestedCakes.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
                <div className="flex gap-2">
                  <button
                    onClick={scrollLeft}
                    className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                    aria-label="Scroll left"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={scrollRight}
                    className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                    aria-label="Scroll right"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {suggestedCakes.map((cake) => (
                  <div
                    key={cake._id}
                    className="flex-none w-[280px] md:w-[320px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer snap-start"
                    onClick={() => navigate(`/cake/${cake.slug}`)}
                  >
                    <div className="aspect-square">
                      <img
                        src={cake.image}
                        alt={cake.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/placeholder-cake.jpg";
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{cake.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{cake.description}</p>
                      <p className="text-rose-500 font-semibold">₹{cake.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Review Modal */}
          {isReviewModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Write a Review</h3>
                  <button
                    onClick={() => setIsReviewModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    disabled={submittingReview}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none"
                        >
                          <svg
                            className={`w-8 h-8 ${star <= (hoveredRating || newReview.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                              }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                      rows="4"
                      placeholder="Share your experience with this cake..."
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsReviewModalOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                      disabled={submittingReview}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-rose-300 hover:bg-rose-400 text-white font-semibold px-6 py-2 rounded-lg transition flex items-center gap-2"
                      disabled={submittingReview}
                    >
                      {submittingReview ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Submitting...
                        </>
                      ) : (
                        'Submit Review'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CakeDetails; 