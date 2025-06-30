import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
      {/* Hero Section */}
      <div className="relative bg-rose-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Family's Sweet Legacy</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Three generations of passion, tradition, and love for baking - creating sweet memories since 1952.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-rose-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* First Generation Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</div>
                <h2 className="text-3xl font-bold text-gray-900">The Beginning - Grandma Maria's Kitchen</h2>
              </div>
              <p className="text-gray-600 mb-4">
                In 1952, our beloved grandmother Maria Rodriguez started baking cakes in her tiny kitchen in downtown. 
                With nothing but her mother's handwritten recipes and an old wood-fired oven, she began creating 
                simple yet delicious cakes for her neighbors and friends.
              </p>
              <p className="text-gray-600 mb-4">
                Her signature vanilla sponge cake with fresh cream became the talk of the town. People would line up 
                outside her house every Sunday, waiting for her famous "Maria's Sunday Special." She believed that 
                every cake should be made with love and patience, a philosophy that still guides us today.
              </p>
              <p className="text-gray-600">
                "A cake is not just food," she used to say, "it's a piece of your heart that you share with others." 
                This simple wisdom became the foundation of our family's baking tradition.
              </p>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/386bada1-6635-4f43-bd09-27d1843b1ba1/977325be-e009-42ce-b63d-e90bbd6721e1.png"
                alt="Grandma Maria's kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Second Generation Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://www.shutterstock.com/image-photo/vintage-circa-1920s-mature-dark-260nw-2469628363.jpg"
                alt="Our first bakery shop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</div>
                <h2 className="text-3xl font-bold text-gray-900">Growing Dreams - Papa Antonio's Bakery</h2>
              </div>
              <p className="text-gray-600 mb-4">
                In 1980, my father Antonio took Grandma Maria's recipes and dreams to the next level. With the 
                support of our entire family, he opened the first "Sweet Delights" bakery on Main Street. 
                What started as a small shop with just three tables became the heart of our community.
              </p>
              <p className="text-gray-600 mb-4">
                Papa Antonio introduced new flavors, experimented with different techniques, and created our 
                now-famous chocolate fudge cake. He expanded the menu to include wedding cakes, birthday cakes, 
                and special occasion desserts. But he never forgot his mother's teachings about quality and love.
              </p>
              <p className="text-gray-600">
                "Every customer who walks through our door becomes part of our family," he would say. "We don't 
                just sell cakes; we create memories that last a lifetime." Under his guidance, Sweet Delights 
                became known for not just delicious cakes, but for the warmth and care that went into every creation.
              </p>
            </div>
          </div>
        </div>

        {/* Third Generation Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</div>
                <h2 className="text-3xl font-bold text-gray-900">Modern Innovation - Our Generation</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Today, as the third generation of bakers, we honor our family's legacy while embracing modern 
                innovation. We've expanded to multiple locations, introduced online ordering, and created 
                custom cake designs that would make Grandma Maria proud.
              </p>
              <p className="text-gray-600 mb-4">
                We've maintained the traditional recipes that made us famous while adding contemporary flavors 
                and dietary options like eggless cakes, gluten-free alternatives, and vegan options. Our 
                commitment to quality ingredients and personalized service remains unchanged.
              </p>
              <p className="text-gray-600">
                We're proud to carry forward the values instilled by our grandmother and father: quality, 
                passion, and treating every customer like family. Every cake we create is a tribute to 
                Grandma Maria's love and Papa Antonio's vision.
              </p>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://i.pinimg.com/736x/29/5c/b8/295cb8354e2aafae6acbcb7e58e0920b.jpg"
                alt="Modern bakery kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Family Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Family Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditional Quality</h3>
              <p className="text-gray-600">
                We preserve Grandma Maria's original recipes and techniques while maintaining the highest standards of quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Love</h3>
              <p className="text-gray-600">
                Every cake is made with the same love and care that Grandma Maria poured into her creations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Service</h3>
              <p className="text-gray-600">
                We treat every customer as part of our extended family, just as Papa Antonio taught us.
              </p>
            </div>
          </div>
        </div>

        {/* Current Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Family Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Isabella Rodriguez',
                role: 'Head Baker & Family Heir',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
                desc: 'Granddaughter of Maria, carrying forward the family legacy'
              },
              {
                name: 'Carlos Rodriguez',
                role: 'Master Pastry Chef',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                desc: 'Son of Antonio, specializing in traditional recipes'
              },
              {
                name: 'Sofia Rodriguez',
                role: 'Cake Designer',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                desc: 'Youngest generation, bringing modern creativity'
              },
              {
                name: 'Miguel Rodriguez',
                role: 'Customer Relations',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
                desc: 'Ensuring every customer feels like family'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-rose-500 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-xs">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legacy Quote */}
        <div className="mt-16 bg-rose-100 rounded-lg p-8 text-center">
          <blockquote className="text-xl italic text-gray-700 mb-4">
            "From Grandma Maria's kitchen to your celebrations - three generations of love, one sweet tradition."
          </blockquote>
          <p className="text-gray-600">- The Rodriguez Family</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 