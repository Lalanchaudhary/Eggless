import React from "react";
import cake from '../assets/cake.jpg'
import CakeGallery from '../components/CakeGallery';
import Carousel from "../components/Carousel";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
    ];

    return (
        <>
            {/* ================= HERO SECTION ================= */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-rose-50 to-amber-50 p-8 md:p-16 min-h-screen">
                <div className="max-w-xl mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Delightfully <span className="text-rose-400">Eggless</span>,<br />
                        Perfectly Crafted Cakes
                    </h1>

                    {/* ✅ Contextual SEO link */}
                    <p className="text-gray-600 text-lg mb-6">
                        Experience the joy of exquisite
                        <a
                            href="/cakes/chocolate-cakes"
                            className="text-rose-500 hover:underline mx-1"
                        >
                            eggless chocolate cakes
                        </a>
                        baked with the finest ingredients and a dash of love.
                    </p>

                    <div className="flex gap-4">
                        <button
                            className="bg-rose-300 hover:bg-rose-400 text-white font-semibold px-6 py-3 rounded shadow transition"
                            onClick={() => navigate("/all-cakes")}
                        >
                            Explore Our Cakes
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-[800px] max-w-[800px] hidden sm:block">
                    <div className="aspect-[4/3] rounded-xl shadow-lg">
                        <img
                            src={cake}
                            alt="Eggless Cakes"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                </div>
            </div>

            {/* ================= CAROUSEL ================= */}
            <Carousel data={Heroimages} height="534" width="534" show={3} />

            {/* ================= POPULAR CAKE CATEGORIES (IMAGE CARDS) ================= */}
            <section className="bg-gradient-to-br from-rose-50 to-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Popular Cake Categories
                    </h2>
                    <p className="text-gray-600 mb-10">
                        Discover our most loved eggless cake collections
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                        {/* Chocolate Cakes */}
                        <a
                            href="/cakes/chocolate-cakes"
                            className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
                        >
                            <div className="h-44 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
                                    alt="Chocolate Cakes"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-rose-500">
                                    Chocolate Cakes
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Rich & indulgent treats
                                </p>
                            </div>
                        </a>

                        {/* Red Velvet Cakes */}
                        <a
                            href="/cakes/red-velvet-cakes"
                            className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
                        >
                            <div className="h-44 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7"
                                    alt="Red Velvet Cakes"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-rose-500">
                                    Red Velvet Cakes
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Smooth & creamy delight
                                </p>
                            </div>
                        </a>

                        {/* Black Forest Cakes */}
                        <a
                            href="/cakes/black-forest-cakes"
                            className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
                        >
                            <div className="h-44 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1604413191066-4dd20bedf486"
                                    alt="Black Forest Cakes"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-rose-500">
                                    Black Forest Cakes
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Timeless classic
                                </p>
                            </div>
                        </a>

                        {/* Butterscotch Cakes */}
                        <a
                            href="/cakes/butterscotch-flavor-cakes"
                            className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
                        >
                            <div className="h-44 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1622621746668-59fb299bc4d7"
                                    alt="Butterscotch Cakes"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-rose-500">
                                    Butterscotch Cakes
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Crunchy & caramel sweet
                                </p>
                            </div>
                        </a>

                    </div>
                </div>
            </section>



            {/* ================= CAKE GALLERY ================= */}
            <CakeGallery />

            {/* ================= FOOTER SEO LINKS ================= */}
            <section className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 text-sm text-gray-700">
                    <h3 className="font-semibold mb-3">Explore More Eggless Cakes</h3>
                    <div className="flex flex-wrap gap-4">
                        <a href="/cakes/vanilla-flavor" className="hover:underline">Vanilla Cakes</a>
                        <a href="/cakes/fruit-cakes" className="hover:underline">Fruit Cakes</a>
                        <a href="/cakes/birthday-cakes" className="hover:underline">Birthday Cakes</a>
                        <a href="/cakes/anniversary-cakes" className="hover:underline">Anniversary Cakes</a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
