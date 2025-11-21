import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import * as adminService from '../../services/adminService';

import { storage } from '../../Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { styled } from '@mui/material/styles';

const SectionContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    rating: 0,
    reviews: 0,
    image: '',
    description: '',
    label: '',
    flavor: '',
    tag: '',
    original_price: '',
    sizes: [],
    ingredients: [],
    allergens: [],
    nutritionInfo: {
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    },
    reviewsList: [],
    number: 0
  });

  const [newSize, setNewSize] = useState({
    size: '',
    price: '',
    serves: ''
  });

  const [newIngredient, setNewIngredient] = useState('');
  const [newAllergen, setNewAllergen] = useState('');
  const [editingSizeIndex, setEditingSizeIndex] = useState(null);
  const [editingSize, setEditingSize] = useState({ size: '', price: '', serves: '' });
  const [searchNumber, setSearchNumber] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await adminService.getAllProducts();
      setProducts(data.products);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setIsUploading(true);
      try {
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setFormData(prev => ({ ...prev, image: downloadURL }));
      } catch (error) {
        setError('Image upload failed. Please try again.');
      }
      setIsUploading(false);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      rating: 0,
      reviews: 0,
      image: '',
      description: '',
      label: '',
      flavor: '',
      tag: '',
      original_price: '',
      sizes: [],
      ingredients: [],
      allergens: [],
      nutritionInfo: {
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
      },
      reviewsList: [],
      number: products.length + 1
    });
    setDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      rating: product.rating,
      reviews: product.reviews || 0,
      image: product.image,
      description: product.description || '',
      label: product.label || '',
      category: product.category || '',
      flavor: product.flavor || '',
      tag: product.tag || '',
      original_price: product.original_price || '',
      sizes: product.sizes || [],
      ingredients: product.ingredients || [],
      allergens: product.allergens || [],
      nutritionInfo: product.nutritionInfo || {
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
      },
      reviewsList: product.reviewsList || [],
      number: product.number?.$numberInt || product.number || ''
    });
    setDialogOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminService.deleteProduct(productId);
        await loadProducts();
      } catch (err) {
        setError(err.message || 'Failed to delete product');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProduct) {
        await adminService.updateProduct(selectedProduct._id, formData);
      } else {
        await adminService.createProduct(formData);
      }
      setDialogOpen(false);
      await loadProducts();
    } catch (err) {
      setError(err.message || 'Failed to save product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('nutritionInfo.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        nutritionInfo: {
          ...prev.nutritionInfo,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddSize = () => {
    if (newSize.size && newSize.price) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, { ...newSize }]
      }));
      setNewSize({ size: '', price: '', serves: '' });
    }
  };

  const handleRemoveSize = (index) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const handleAddIngredient = () => {
    if (newIngredient) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient]
      }));
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleAddAllergen = () => {
    if (newAllergen) {
      setFormData(prev => ({
        ...prev,
        allergens: [...prev.allergens, newAllergen]
      }));
      setNewAllergen('');
    }
  };

  const handleRemoveAllergen = (index) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mb={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }



  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Products Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>

      {/* Search box for number */}
      <Box mb={3} maxWidth={300}>
        <TextField
          label="Search by Number"
          variant="outlined"
          size="small"
          fullWidth
          value={searchNumber}
          onChange={e => setSearchNumber(e.target.value)}
        />
      </Box>

      {/* Render products grouped by category */}
      {(() => {
        const filteredProducts = searchNumber.trim()
          ? products.filter(product => {
              const num = product.number?.$numberInt || product.number || '';
              return num.toString() === searchNumber.trim();
            })
          : products;
        const groupedProductsFiltered = filteredProducts.reduce((acc, product) => {
          const label = product.label || 'Unlabeled';
          if (!acc[label]) acc[label] = [];
          acc[label].push(product);
          return acc;
        }, {});
        return Object.keys(groupedProductsFiltered).map((label) => (
          <Box key={label} mb={5}>
            <Typography variant="h5" sx={{ mb: 2, mt: 3 }} color="secondary">
              {label} ({groupedProductsFiltered[label].length})
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Flavor</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Label</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedProductsFiltered[label].map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: 50, height: 50, objectFit: 'cover' }}
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.flavor}</TableCell>
                      <TableCell>₹{product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.rating}</TableCell>
                      <TableCell>{product.label}</TableCell>
                      <TableCell>{product.number?.$numberInt || product.number || ''}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleEditProduct(product)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ));
      })()}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <SectionContainer>
              <Typography variant="h6" gutterBottom>Basic Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Flavor"
                    name="flavor"
                    value={formData.flavor}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Original Price"
                    name="original_price"
                    type="number"
                    value={formData.original_price}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Label"
                    name="label"
                    value={formData.label}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tag"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Number"
                    name="number"
                    type="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </SectionContainer>

            <SectionContainer>
              <Typography variant="h6" gutterBottom>Product Image</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                  >
                    Upload File
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {isUploading && <CircularProgress size={24} sx={{ ml: 2 }} />}
                </Grid>
                {(imageFile || formData.image) && (
                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Typography variant="subtitle1">Image Preview:</Typography>
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                        alt="Preview"
                        style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>
            </SectionContainer>

            <SectionContainer>
              <Typography variant="h6" gutterBottom>Sizes</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Size"
                    value={newSize.size}
                    onChange={(e) => setNewSize(prev => ({ ...prev, size: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    value={newSize.price}
                    onChange={(e) => setNewSize(prev => ({ ...prev, price: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Serves"
                    value={newSize.serves}
                    onChange={(e) => setNewSize(prev => ({ ...prev, serves: e.target.value }))}
                  />
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                onClick={handleAddSize}
                sx={{ mt: 1 }}
              >
                Add Size
              </Button>
              <List>
                {formData.sizes.map((size, index) => (
                  <ListItem key={index}>
                    {editingSizeIndex === index ? (
                      <>
                        <TextField
                          label="Size"
                          value={editingSize.size}
                          onChange={e => setEditingSize(prev => ({ ...prev, size: e.target.value }))}
                          size="small"
                          sx={{ mr: 1, width: 80 }}
                        />
                        <TextField
                          label="Price"
                          type="number"
                          value={editingSize.price}
                          onChange={e => setEditingSize(prev => ({ ...prev, price: e.target.value }))}
                          size="small"
                          sx={{ mr: 1, width: 80 }}
                        />
                        <TextField
                          label="Serves"
                          value={editingSize.serves}
                          onChange={e => setEditingSize(prev => ({ ...prev, serves: e.target.value }))}
                          size="small"
                          sx={{ mr: 1, width: 120 }}
                        />
                        <IconButton
                          edge="end"
                          aria-label="save"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              sizes: prev.sizes.map((s, i) => i === index ? { ...editingSize } : s)
                            }));
                            setEditingSizeIndex(null);
                          }}
                        >
                          <span role="img" aria-label="save">💾</span>
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="cancel"
                          onClick={() => setEditingSizeIndex(null)}
                        >
                          <span role="img" aria-label="cancel">❌</span>
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <ListItemText
                          primary={`${size.size} - ₹${size.price}`}
                          secondary={`Serves: ${size.serves}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => {
                              setEditingSizeIndex(index);
                              setEditingSize(size);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveSize(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </>
                    )}
                  </ListItem>
                ))}
              </List>
            </SectionContainer>

            <SectionContainer>
              <Typography variant="h6" gutterBottom>Ingredients</Typography>
              <TextField
                fullWidth
                label="Add Ingredient"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddIngredient();
                  }
                }}
              />
              <List>
                {formData.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={ingredient} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </SectionContainer>

            <SectionContainer>
              <Typography variant="h6" gutterBottom>Allergens</Typography>
              <TextField
                fullWidth
                label="Add Allergen"
                value={newAllergen}
                onChange={(e) => setNewAllergen(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddAllergen();
                  }
                }}
              />
              <List>
                {formData.allergens.map((allergen, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={allergen} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveAllergen(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </SectionContainer>

            <SectionContainer>
              <Typography variant="h6" gutterBottom>Nutrition Info</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Calories"
                    name="nutritionInfo.calories"
                    value={formData.nutritionInfo.calories}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Protein"
                    name="nutritionInfo.protein"
                    value={formData.nutritionInfo.protein}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Carbs"
                    name="nutritionInfo.carbs"
                    value={formData.nutritionInfo.carbs}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fat"
                    name="nutritionInfo.fat"
                    value={formData.nutritionInfo.fat}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </SectionContainer>

            <SectionContainer>
              <Typography variant="h6" gutterBottom>Reviews</Typography>
              <List>
                {formData.reviewsList.map((review, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Review ${index + 1}: ${review.comment}`}
                      secondary={`Rating: ${review.rating}/5`}
                    />
                  </ListItem>
                ))}
              </List>
            </SectionContainer>

            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {selectedProduct ? 'Save Changes' : 'Add Product'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Products;