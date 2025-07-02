import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../Firebase';
import { checkPhoneNumber, register } from '../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import phoneicon from '../assets/phoneicon.png'
import CelebrationModal from '../components/CelebrationModel';
import Loading from '../components/Loading';
const OTP_LENGTH = 6; // 6-digit OTP

const maskPhone = (phone) => {
  if (!phone) return '';
  return phone.replace(/^([+]?\d{2})\d{4}(\d{4})$/, '$1******$2');
};
const maskEmail = (email) => {
  if (!email) return '';
  const [name, domain] = email.split('@');
  return name.slice(0, 3) + '*'.repeat(Math.max(0, name.length - 3)) + '@' + domain;
};

const Profile = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    otp: '',
    name: '',
    email: '',
  });
  const [otpArray, setOtpArray] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);
  const otpRefs = useRef([]);

  // Timer effect
  useEffect(() => {
    if (isOtpSent && !isOtpVerified && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isOtpSent, isOtpVerified, timer]);

  // Reset OTP and timer when phone changes
  useEffect(() => {
    if (!isOtpSent) {
      setOtpArray(Array(OTP_LENGTH).fill(''));
      setTimer(30);
    }
  }, [isOtpSent]);

  // Handle OTP input
  const handleOtpChange = (idx, value) => {
    if (!/^\d?$/.test(value)) return;
    const newArr = [...otpArray];
    newArr[idx] = value;
    setOtpArray(newArr);
    // Move focus
    if (value && idx < OTP_LENGTH - 1) {
      otpRefs.current[idx + 1].focus();
    }
    if (!value && idx > 0) {
      otpRefs.current[idx - 1].focus();
    }
    // Update formData.otp
    setFormData({ ...formData, otp: newArr.join('') });
  };

  // Handle phone/other input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
        throw new Error('Please enter a valid phone number');
      }
      // Setup reCAPTCHA
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: (response) => { },
        });
      }
      const appVerifier = window.recaptchaVerifier;
      const fullPhone = formData.phoneNumber.startsWith('+')
        ? formData.phoneNumber
        : `+91${formData.phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      window.confirmationResult = confirmation;
      setIsOtpSent(true);
      setTimer(30);
      toast.success(`Otp sent to ${fullPhone}`, { position: "top-right", autoClose: 3000 });
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Try again.');
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!formData.otp || formData.otp.length !== OTP_LENGTH) {
        throw new Error(`Please enter a valid ${OTP_LENGTH}-digit OTP`);
      }
      const result = await window.confirmationResult.confirm(formData.otp);
      // Check if user exists
      const data = await checkPhoneNumber(formData.phoneNumber);
      if (data.isExistingUser) {
        setIsExistingUser(true);
        navigate('/user-profile');
        setTimeout(() => {
          window.location.reload(); // Then refresh
        }, 100); // Small delay to allow navigation to complete
      } else {
        setIsOtpVerified(true);
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Complete profile for new user
  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!formData.name.trim()) throw new Error('Please enter your name');
      if (!formData.email || !formData.email.includes('@')) throw new Error('Please enter a valid email address');
      await register({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });
      setShowCelebration(true);
    } catch (err) {
      setError(err.message || 'Failed to complete profile. Please try again.');
    }
  };

  // "Login using Password" handler (implement as needed)
  const handleLoginWithPassword = () => {
    toast.info('Password login not implemented in this demo.');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CelebrationModal
          isOpen={showCelebration}
          onClose={() => {
            setShowCelebration(false);
            navigate('/user-profile');  // First navigate
            setTimeout(() => {
              window.location.reload(); // Then refresh
            }, 100); // Small delay to allow navigation to complete
          }}
        />
        <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl w-full">
          {/* Left Section */}
          <div className="hidden md:flex flex-col items-center justify-center bg-pink-50 w-1/2 p-8">
            <img src={phoneicon} alt="Gift" className="w-40 mb-8" />
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="text-xl">🛒</span>
                <span>Instant Checkout</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📦</span>
                <span>Manage Your Orders</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">🏷️</span>
                <span>Exclusive Offers</span>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            {/* Phone Input */}
            {!isOtpSent && !isOtpVerified && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-center">Login with Phone Number</h2>
                <form className="space-y-6" onSubmit={handleSendOtp}>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-400 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
                  >
                    Send OTP
                  </button>
                </form>
              </>
            )}

            {/* OTP Input */}
            {isOtpSent && !isOtpVerified && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-center">Verify OTP</h2>
                <p className="text-center mb-4">Please enter the OTP sent to your</p>
                <div className="text-center mb-2">
                  <span>Mobile - <b className="text-blue-700">{maskPhone(formData.phoneNumber)}</b></span><br />

                </div>
                <div className="text-center mb-4">
                  <button className="text-blue-600 underline" onClick={() => setIsOtpSent(false)}>Change</button>
                </div>
                <form onSubmit={handleVerifyOtp}>
                  <div className="flex justify-center space-x-2 mb-2">
                    {otpArray.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={el => otpRefs.current[idx] = el}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(idx, e.target.value)}
                        className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded focus:border-pink-400"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>
                  <div className="text-center text-pink-600 mb-4">
                    OTP Valid for {timer} Sec
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-pink-400 text-white font-semibold rounded mb-2"
                    disabled={otpArray.some(d => !d) || timer === 0 || loading}
                  >
                    {loading ? 'Verifying...' : 'CONTINUE'}
                  </button>
                </form>
                <div className="text-center text-xs text-gray-500 mb-2">
                  By continuing, you agree to Winni <a href="#" className="text-blue-600 underline">Terms of Use</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
                </div>
                <button
                  className="w-full py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
                  onClick={handleLoginWithPassword}
                >
                  Login using Password
                </button>
              </>
            )}

            {/* Complete Profile */}
            {isOtpVerified && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-center">Complete Your Profile</h2>
                <form className="space-y-6" onSubmit={handleCompleteProfile}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-pink-400 text-white font-semibold rounded mb-2"
                  >
                    Complete Profile
                  </button>
                </form>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative text-center" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div id="recaptcha-container"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
