import React, { useEffect, useRef, useState } from 'react';
import BackDropSection from './BackDropSection';
import { getAllCakes } from '../services/cakeServices';
import Loading from './Loading';
import CakeCard from './CakeCard';
const CakeGallery = () => {
  const trendingScrollRef = useRef(null);
  const surpriseScrollRef = useRef(null);
  const bestSellersScrollRef = useRef(null);
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        const data = await getAllCakes();
        setCakes(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching cakes:', err);
        setError('Failed to fetch cakes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);


  const trendingCakes = cakes.filter(cake => cake.label === 'Trending');
  const surpriseCakes = cakes.filter(cake => cake.tag === 'Annivarsary');
  const bestSellers = cakes.filter(cake => cake.label === 'Best Seller');

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const CakeSection = ({ title, cakes, backdrop, scrollRef }) => (
    <div className={backdrop ? "mb-8 relative lg:p-6 md:p-2" : "mb-8"}>
      {backdrop && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-pink-100/80 to-rose-200/80 rounded-xl" />
          <svg className="absolute top-4 left-4 w-8 h-8 opacity-30" fill="#e098b0" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          <svg className="absolute bottom-4 right-4 w-12 h-12 opacity-20" fill="#e098b0" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-left text-[#1F2937] relative z-10">{title}</h2>
        <div className="flex hidden lg:block md:block gap-2 z-10">
          <button
            onClick={() => scrollLeft(scrollRef)}
            className="p-2 mr-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollRight(scrollRef)}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className={backdrop ? "relative z-10" : ""}>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {cakes.map(cake => (
            <div key={cake._id} className="flex-none w-[280px] md:w-[320px] snap-start">
              <CakeCard cake={cake} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 p-3 lg:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 p-3 lg:p-6">
      <CakeSection
        title="Our Trending Cakes"
        cakes={trendingCakes}
        scrollRef={trendingScrollRef}
      />
      <CakeSection
        title="Surprise Your Love"
        cakes={surpriseCakes}
        backdrop
        scrollRef={surpriseScrollRef}
      />
      <BackDropSection />
      <CakeSection
        title="Our Best Sellers"
        cakes={bestSellers}
        scrollRef={bestSellersScrollRef}
      />
    </div>
  );
};

export default CakeGallery; 