import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
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
  Alert,
  CircularProgress,
} from '@mui/material';
import { getCurrentLocation } from '../../lib/getCurrentLocation';
import { reverseGeocode } from '../../lib/reverseGeocode';
import { useUser } from "../../context/UserContext";
import { getAllAdmins } from '../../services/adminService';
import { getDistanceFromLatLonInKm } from '../../lib/utils';

const ShipAddr = ({
  setSelectedAddress1,
  setShippingCost,
  shippingCost,
  shippingLoading,
  setShippingLoading,
  selectedAddress: selectedAddressProp,
  onOrderInstructionChange,
  orderInstruction,
  setOrderInstruction,
  setShipping,
  deliveryDate,
  setDeliveryDate,
  deliveryTime,
  setDeliveryTime
}) => {
  const { user, addAddress, updateAddress } = useUser();
  const [selectedAddress, setSelectedAddress] = useState(selectedAddressProp || null);
  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(deliveryDate || '');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(deliveryTime || '');

  const setSelectAdr = (address) => {
    setSelectedAddress(address);
    setSelectedAddress1(address);
  };

  useEffect(() => {
    if (user?.addresses?.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault);
      setSelectedAddress(defaultAddress || user.addresses[0]);
    }
  }, [user?.addresses]);

  useEffect(() => {
    const calculateShipping = async () => {
      if (!selectedAddress || !setShippingCost || !setShippingLoading) return;
      setShippingLoading(true);
      try {
        const { admins } = await getAllAdmins();
        let userLocation = selectedAddress.location;

        if (!userLocation.latitude || !userLocation.longitude) {
          const fullAddress = `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.pincode}`;
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`);
          const data = await res.json();
          if (data.length > 0) {
            userLocation = {
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon)
            };
          } else {
            setShippingCost(0);
            setShippingLoading(false);
            return;
          }
        }

        let minDistance = Infinity;
        for (const admin of admins) {
          const adminLocation = admin.location;
          if (adminLocation) {
            const distance = getDistanceFromLatLonInKm(
              adminLocation.latitude,
              adminLocation.longitude,
              userLocation.latitude,
              userLocation.longitude
            );
            if (distance < minDistance) {
              minDistance = distance;
            }
          }
        }
        setShippingCost(minDistance !== Infinity ? minDistance * 10 : 0);
        setShipping(minDistance !== Infinity ? minDistance * 10 : 0)
      } catch (error) {
        setShippingCost(0);
      } finally {
        setShippingLoading(false);
      }
    };
    calculateShipping();
  }, [selectedAddress, setShippingCost, setShippingLoading, setShipping]);

  const handleAddressOpen = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setAddressFormData(address);
    } else {
      setEditingAddress(null);
      setAddressFormData({
        type: 'Home',
        street: '',
        city: '',
        state: '',
        pincode: '',
        location: { latitude: '', longitude: '' },
        isDefault: false
      });
    }
    setOpen(true);
  };

  const handleAddressClose = () => {
    setOpen(false);
    setEditingAddress(null);
    setAddressFormData({
      type: 'Home',
      street: '',
      city: '',
      state: '',
      pincode: '',
      location: { latitude: '', longitude: '' },
      isDefault: false
    });
    setError(null);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (setDeliveryDate) setDeliveryDate(selectedDeliveryDate);
    if (setDeliveryTime) setDeliveryTime(selectedDeliveryTime);
  }, [selectedDeliveryDate, selectedDeliveryTime, setDeliveryDate, setDeliveryTime]);

  const handleAddressSubmit = async () => {
    if (!addressFormData.city || !addressFormData.state || !addressFormData.pincode) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (editingAddress) {
        await updateAddress(editingAddress._id, addressFormData);
      } else {
        await addAddress(addressFormData);
      }
      handleAddressClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h6">Shipping Information</Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <Box display="flex" justifyContent="space-between" my={2}>
          <Typography variant="subtitle1">Select a Shipping Address</Typography>
          <Button onClick={() => handleAddressOpen()} variant="contained">Add Address</Button>
        </Box>
        {/* Delivery Date and Time Fields */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <TextField
            label="Delivery Date"
            type="date"
            value={selectedDeliveryDate}
            onChange={e => setSelectedDeliveryDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            className="w-full md:w-1/2"
          />
          <TextField
            label="Delivery Time"
            type="time"
            value={selectedDeliveryTime}
            onChange={e => setSelectedDeliveryTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            className="w-full md:w-1/2"
          />
        </div>

        {user?.addresses?.length === 0 ? (
          <Typography>No addresses found.</Typography>
        ) : (
          user.addresses.map(address => (
            <Card
              key={address._id}
              onClick={() => setSelectAdr(address)}
              sx={{
                border: selectedAddress?._id === address._id ? '2px solid #e098b0' : '1px solid #e0e0e0',
                mb: 2
              }}
            >
              <CardContent>
                <Typography>{address.type}</Typography>
                <Typography>{address?.street && ','} {address.city}, {address.state} {address.pincode}</Typography>
              </CardContent>
            </Card>
          ))
        )}

        {shippingLoading ? (
          <Typography>Calculating shipping...</Typography>
        ) : (
          selectedAddress && <Typography>Shipping Charge: ₹{shippingCost.toFixed(2)}</Typography>
        )}

        <TextField
          label="Write message on Cake"
          fullWidth
          multiline
          rows={2}
          value={orderInstruction}
          onChange={e => {
            setOrderInstruction(e.target.value);
            onOrderInstructionChange?.(e.target.value);
          }}
          sx={{ mt: 2 }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 3 }}>
          • Please ensure the delivery address is complete and accurate.
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 3 }}>
         • We are not responsible for delays caused by incorrect or incomplete address details.
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 3 }}>
          • Delivery time is an estimate and may vary due to traffic, weather, or unforeseen conditions.
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 3 }}>
          • Our delivery partner may contact you at the provided phone number for smooth delivery.
        </Typography>


        <Dialog open={open} onClose={handleAddressClose} fullWidth>
          <DialogTitle>{editingAddress ? 'Edit Address' : 'Add Address'}</DialogTitle>
          <DialogContent>
            <Button
              fullWidth
              sx={{ my: 2 }}
              onClick={async () => {
                try {
                  setLoading(true);
                  const loc = await getCurrentLocation();
                  const addr = await reverseGeocode(loc.latitude, loc.longitude);
                  setAddressFormData(prev => ({
                    ...prev,
                    location: { latitude: loc.latitude, longitude: loc.longitude },
                    ...addr
                  }));
                } catch {
                  setError('Failed to get current location');
                } finally {
                  setLoading(false);
                }
              }}
            >
              Use Current Location
            </Button>

            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select name="type" value={addressFormData.type} onChange={handleAddressChange}>
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField fullWidth name="street" label="Street" value={addressFormData.street} onChange={handleAddressChange} margin="normal" />
            <TextField fullWidth name="city" label="City" value={addressFormData.city} onChange={handleAddressChange} margin="normal" required />
            <TextField fullWidth name="state" label="State" value={addressFormData.state} onChange={handleAddressChange} margin="normal" required />
            <TextField fullWidth name="pincode" label="Pincode" value={addressFormData.pincode} onChange={handleAddressChange} margin="normal" required />

            <FormControl fullWidth margin="normal">
              <InputLabel>Default</InputLabel>
              <Select name="isDefault" value={addressFormData.isDefault} onChange={handleAddressChange}>
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddressClose}>Cancel</Button>
            <Button onClick={handleAddressSubmit} disabled={loading} variant="contained">
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

    </>
  );
};

export default ShipAddr;
