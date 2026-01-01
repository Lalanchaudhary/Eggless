import React from "react";
import cake from '../assets/cake.jpg'
import CakeGallery from './CakeGallery';
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  let Heroimages = [
    {
      image: "https://i.pinimg.com/736x/39/8c/b3/398cb39a0415321977ee080472e85c48.jpg",
      path: '/all-cakes'
    },
    {
      image: "https://i.pinimg.com/736x/56/c4/ff/56c4fff60e85560acedeedb4fee972bb.jpg",
      path: '/birthday-cakes'
    },
    {
      image: "https://i.pinimg.com/736x/68/65/f3/6865f3f5a1af9c8d425ce509f89e3191.jpg",
      path: '/anniversary'
    },
    {
      image: "https://bkmedia.bakingo.com/regular-cake-desktop_12.jpg",
      path: '/all-cakes'
    }
  ]

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      review: "The eggless chocolate cake was absolutely divine! My daughter's birthday was made extra special. The cake was moist, rich, and everyone kept asking where I got it from. Will definitely order again!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiAPveR3iBy5hxIC8zKJvPKziHdOviOBUebg&s",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Rajesh Patel",
      rating: 5,
      review: "Ordered a wedding anniversary cake and it exceeded all expectations! The vanilla sponge was light and fluffy, and the decoration was exactly what we wanted. The delivery was on time and the cake was fresh.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Anjali Desai",
      rating: 5,
      review: "As someone with egg allergies, finding good cakes has always been a challenge. Sweet Delights has been a game-changer! Their eggless cakes taste even better than regular ones. Highly recommended!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      date: "3 days ago"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 5,
      review: "The red velvet cake was a hit at our office party! Everyone loved it and couldn't believe it was eggless. The texture was perfect and the cream cheese frosting was heavenly. Great service too!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiAPveR3iBy5hxIC8zKJvPKziHdOviOBUebg&s",
      date: "5 days ago"
    },
    {
      id: 5,
      name: "Meera Iyer",
      rating: 5,
      review: "Ordered a custom birthday cake for my son and it was exactly what he wanted! The Spiderman design was perfect and the chocolate flavor was amazing. The cake stayed fresh for days. Thank you!",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      date: "1 week ago"
    },
    {
      id: 6,
      name: "Arun Kumar",
      rating: 5,
      review: "Best eggless cakes in the city! The black forest cake was rich and delicious. The cherries were fresh and the chocolate shavings were perfect. Will definitely be a regular customer.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      date: "4 days ago"
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-rose-50 to-amber-50 p-8 md:p-16 min-h-screen">
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"> Delightfully <span className="text-rose-400">Eggless</span>,<br /> Perfectly Crafted Cakes </h1>
          <p className="text-gray-600 text-lg mb-6"> Experience the joy of exquisite eggless cakes, baked with the finest ingredients and a dash of love. Find your perfect slice for any occasion. </p>
          <div className="flex gap-4">
            <button className="bg-rose-300 hover:bg-rose-400 text-white font-semibold px-6 py-3 rounded shadow transition" onClick={() => { navigate("/all-cakes") }}> Explore Our Cakes </button>
            <button className="bg-amber-100 hover:bg-amber-200 text-gray-800 font-medium px-6 py-3 rounded shadow transition"> Get Inspired </button>
          </div>
        </div>
        <div className="w-full md:w-[800px] max-w-[800px]"> <div className="aspect-[4/3] bg-gray-300 rounded-xl flex items-center justify-center text-4xl text-gray-500 shadow-lg"> <img src={cake} alt="cake" onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder-cake.jpg"; }} className="w-full h-full object-cover rounded-xl" /> </div> </div> </div>


      <Carousel data={Heroimages} height="534" width="534" show={3} />
      <CakeGallery />

      {/* Customer Reviews Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers who have experienced the magic of our eggless cakes!
            </p>
            <div className="flex justify-center items-center mt-4">
              <StarRating rating={5} />
              <span className="ml-2 text-gray-600">4.9/5 from 500+ reviews</span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-rose-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                {/* Review Header */}
                <div className="flex items-center mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder-cake.jpg";
                    }}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <div className="flex items-center">
                      <StarRating rating={review.rating} />
                      <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-gray-700 leading-relaxed">
                  "{review.review}"
                </p>

                {/* Verified Badge */}
                <div className="flex items-center mt-4">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-600 text-sm font-medium">Verified Purchase</span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors">
              Read More Reviews
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
