import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderSuccessanimation from '../components/OrderSucees';

const OrderSuccess = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {showAnimation ? (
        <div className="flex items-center justify-center h-full">
          <OrderSuccessanimation />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your order. We'll send you a confirmation email with your order details shortly.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
            <div className="space-y-4">
              {/* Step 1 */}
              <Step number="1" title="Order Confirmation" desc="You'll receive an email confirmation with your order details and tracking information." />
              {/* Step 2 */}
              <Step number="2" title="Order Processing" desc="Our team will start preparing your order right away." />
              {/* Step 3 */}
              <Step number="3" title="Delivery" desc="Your order will be delivered to your specified address." />
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="inline-block bg-rose-500 text-white px-6 py-3 rounded-md hover:bg-rose-600 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const Step = ({ number, title, desc }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
        <span className="text-rose-500 font-medium">{number}</span>
      </div>
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  </div>
);

export default OrderSuccess;
