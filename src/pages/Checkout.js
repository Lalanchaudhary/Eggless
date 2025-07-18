import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Alert,
  CircularProgress,
  RadioGroup,
  Radio,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ShipAddr from '../components/checkout/ShipAddr';
import Payment from '../components/checkout/Payment';
import { getAllAdmins } from '../services/adminService';
import { getDistanceFromLatLonInKm } from '../lib/utils';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Address form data
  const [addressFormData, setAddressFormData] = useState({
    type: 'Home',
    street: '',
    city: '',
    state: '',
    pincode: '',
    location: {
      latitude: '',
      longitude: ''
    },
    isDefault: false
  });

  const [shippingCost, setShippingCost] = useState(0);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [orderInstruction, setOrderInstruction] = useState("");
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const geocodeAddress = async (address) => {
    const parts = [address.street, address.city, address.state, address.pincode]
      .filter(Boolean) // removes undefined or empty parts
      .join(', ');
  
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(parts)}`);
    const data = await res.json();
    if (data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    }
    return null;
  };
  

  
  // Function to validate location distance
  const validateLocationDistance = async (address) => {
    if (!address || !address.location) {
      setLocationError('Address is missing');
      return false;
    }
  
    let userLocation = address.location;
  
    // Check and fix missing coordinates
    if (!userLocation.latitude || !userLocation.longitude) {
      const geoCoords = await geocodeAddress(address);
      if (!geoCoords) {
        setLocationError('Could not determine location from the provided address');
        return false;
      }
      userLocation = geoCoords;
    }
  
    setLocationLoading(true);
    setLocationError(null);
  
    try {
      const { admins } = await getAllAdmins();
  
      if (!admins || admins.length === 0) {
        setLocationError('No delivery locations available. Please contact support.');
        return false;
      }
  
      let minDistance = Infinity;
      let nearestAdmin = null;
  
      for (const admin of admins) {
        const adminLocation = admin.location;
        if (adminLocation?.latitude && adminLocation?.longitude) {
          const distance = getDistanceFromLatLonInKm(
            adminLocation.latitude,
            adminLocation.longitude,
            userLocation.latitude,
            userLocation.longitude
          );
          console.log('====================================');
          console.log( "dis",userLocation.latitude,"minDis",userLocation.longitude);
          console.log('====================================');
          if (distance < minDistance) {
            minDistance = distance;
            nearestAdmin = admin;
          }

        }
      }

  
      if (minDistance === Infinity) {
        setLocationError('Unable to calculate delivery distance. Please try again.');
        return false;
      }
  
      if (minDistance > 100) {
        setLocationError(
          `Sorry, we cannot deliver to your location. The nearest delivery point is ${minDistance.toFixed(1)}km away, which exceeds our 100km delivery limit.`
        );
        return false;
      }
  
      // Valid
      setLocationError(null);
      return true;
    } catch (error) {
      console.error('Error validating location:', error);
      setLocationError('Unable to validate delivery location. Please try again.');
      return false;
    } finally {
      setLocationLoading(false);
    }
  };
  

  useEffect(() => {
    // Set default address if available
    if (user?.addresses?.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault);
      const addressToSet = defaultAddress || user.addresses[0];
      setSelectedAddress1(addressToSet);
      
      // Validate the default address
      if (addressToSet) {
        validateLocationDistance(addressToSet);
      }
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user?.addresses]);

  // Watch for address changes and validate
  useEffect(() => {
    if (selectedAddress) {
      validateLocationDistance(selectedAddress);
    }
  }, [selectedAddress]);

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    setSubtotal(subtotal);
    const tax = subtotal * 0.05;
    const total = subtotal + shippingCost + tax;
    setTotal(total);
    setTax(tax);
  },[])

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      setError('Please select a shipping address');
      return;
    }

    // Validate location before proceeding
    const isLocationValid = await validateLocationDistance(selectedAddress);
    if (!isLocationValid) {
      return;
    }

    // await handlePayment();
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      if (!selectedAddress) {
        setError('Please select a shipping address');
        return;
      }

      // Validate location before proceeding to next step
      const isLocationValid = await validateLocationDistance(selectedAddress);
      if (!isLocationValid) {
        return;
      }
    }

    setError(null);
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Box>
            {locationError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  Delivery Location Issue
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {locationError}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                    What you can do:
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>Select a different delivery address</li>
                    <li>Add a new address within our delivery range</li>
                    <li>Contact our customer support for assistance</li>
                  </ul>
                </Box>
              </Alert>
            )}
            
            {locationLoading && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography variant="body2">Validating delivery location...</Typography>
              </Box>
            )}
            
          <ShipAddr setSelectedAddress1={setSelectedAddress1} setShippingCost={setShippingCost} shippingCost={shippingCost} shippingLoading={shippingLoading} setShippingLoading={setShippingLoading} selectedAddress={selectedAddress} orderInstruction={orderInstruction} setOrderInstruction={setOrderInstruction} setShipping={setShipping} />
          </Box>
        );
      case 2:
        return (
          <Payment selectedAddress={selectedAddress} orderInstruction={orderInstruction} tax={tax} shipping={shipping}/>
        );
      case 3:
        return (
          <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Order Review
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1 }}>
                  Shipping Information
                </Typography>
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {user?.name}<br />
                  {selectedAddress?.street}<br />
                  {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.pincode}<br />
                  {user?.email}<br />
                  {user?.phone}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1 }}>
                  Order Summary
                </Typography>
                {cartItems.map(item => (
                  <Box key={item.id} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}>
                    <Typography>{item.name} x {item.quantity}</Typography>
                    <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                  </Box>
                ))}
                <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 2, pt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <Typography>Subtotal</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <Typography>Shipping</Typography>
                    <Typography>₹{shippingCost.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <Typography>Tax</Typography>
                    <Typography>${tax.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mt: 2, 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}>
                    <Typography variant="subtitle1">Total</Typography>
                    <Typography variant="subtitle1">₹{total.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      py: { xs: 2, sm: 4, md: 6 },
      px: { xs: 1, sm: 2, md: 3 }
    }}>
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto',
        px: { xs: 1, sm: 2, md: 3 }
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: { xs: 3, sm: 4, md: 6 },
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Checkout
        </Typography>
        
        {/* Progress Steps */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 2, sm: 0 }
          }}>
            {['Shipping', 'Payment', 'Review'].map((step, index) => (
              <Box key={step} sx={{ 
                display: 'flex', 
                alignItems: 'center',
                width: { xs: '100%', sm: 'auto' }
              }}>
                <Box sx={{ 
                  width: { xs: 32, sm: 36 },
                  height: { xs: 32, sm: 36 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: currentStep > index + 1 ? 'primary.main' : 
                          currentStep === index + 1 ? 'primary.light' : 'grey.300'
                }}>
                  <Typography sx={{ 
                    color: 'white', 
                    fontWeight: 'medium',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                    {index + 1}
                  </Typography>
                </Box>
                <Typography sx={{ 
                  ml: 1,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  color: currentStep === index + 1 ? 'primary.main' : 'text.secondary',
                  fontWeight: currentStep === index + 1 ? 'medium' : 'normal'
                }}>
                  {step}
                </Typography>
                {index < 2 && !isMobile && (
                  <Box sx={{ 
                    width: { xs: 32, sm: 64, md: 96 },
                    height: 2,
                    mx: 2,
                    bgcolor: currentStep > index + 1 ? 'primary.main' : 'grey.300'
                  }} />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleOrderSubmit} sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
          p: { xs: 2, sm: 3, md: 4 }
        }}>
          {renderStep()}
          
          {/* Navigation Buttons */}
          <Box sx={{ 
            mt: { xs: 4, sm: 6 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            justifyContent: 'space-between'
          }}>
            {currentStep > 1 && (
              <Button
                variant="outlined"
                onClick={prevStep}
                disabled={loading}
                fullWidth={isMobile}
              >
                Back
              </Button>
            )}
            {currentStep < 2 ? (
              <Button
                variant="contained"
                onClick={nextStep}
                disabled={loading || (currentStep === 1 && !selectedAddress) || locationLoading || !!locationError}
                sx={{ 
                  ml: { sm: 'auto' },
                  bgcolor: '#272361',
                  '&:hover': { bgcolor: '#272361' },
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                {locationLoading ? 'Validating...' : 'Next'}
              </Button>
            ) : ''
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout; 