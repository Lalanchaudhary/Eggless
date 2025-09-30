import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import temp from "../../assets/temp1.png";
const Templates = () => {
  const [formData, setFormData] = useState({
    image: null,
    originalPrice: "",
    discountPrice: "",
    message: "",
    customMessage: "",
  });

  const [finalData, setFinalData] = useState(null);

  const predefinedMessages = [
    "Limited Time Offer!",
    "Best Deal Just for You!",
    "Hurry, While Stock Lasts!",
    "Special Discount on Eggless Cakes!",
    "Perfect for Your Celebration!",
    "Fresh & Delicious Eggless Cakes",
    "Order Now for Special Occasions",
    "Premium Quality at Best Price",
  ];

  // Convert image file to base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
      const base64Img = await convertToBase64(files[0]);
      setFormData({ ...formData, image: base64Img });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      message: formData.customMessage || formData.message,
    };

    setFinalData(updatedData);
  };

  // Styles
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
      backgroundColor: "#f5f5f5",
    },
    bgImage:{
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: -1,
    },
    heading: {
      fontSize: 24,
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
      color: "#d32f2f",
    },
    text: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: "bold",
    },
    priceText: {
      fontSize: 18,
      marginBottom: 8,
    },
    originalPrice: {
      textDecoration: "line-through",
      color: "#757575",
      marginRight: 10,
    },
    discountPrice: {
      color: "#d32f2f",
      fontWeight: "bold",
    },
    message: {
      fontSize: 20,
      marginTop: 15,
      marginBottom: 15,
      textAlign: "center",
      color: "#d32f2f",
      fontWeight: "bold",
      padding: 10,
      backgroundColor: "#ffebee",
      borderRadius: 5,
    },
    box: {
      padding: 20,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: 10,
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    productImage: {
      width: 250,
      height: 250,
      margin: "20 auto",
      objectFit: "contain",
      borderRadius: 10,
    },
    treatYourself: {
      fontSize: 22,
      textAlign: "center",
      marginTop: 20,
      marginBottom: 10,
      color: "#d32f2f",
      fontWeight: "bold",
    },
    superCake: {
      fontSize: 28,
      textAlign: "center",
      marginBottom: 20,
      color: "#d32f2f",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  });

  // Invoice PDF Component
  const Invoice = ({ finalData }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={temp} style={styles.bgImage} />
        
        <Text style={styles.superCake}>Super Cake</Text>
        <Text style={styles.treatYourself}>Treat Yourself</Text>
        
        {finalData.image && <Image src={finalData.image} style={styles.productImage} />}
        
        <View style={styles.box}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
            <Text style={[styles.priceText, styles.originalPrice]}>₹{finalData.originalPrice}</Text>
            <Text style={[styles.priceText, styles.discountPrice]}>₹{finalData.discountPrice}</Text>
          </View>
          
          {finalData.message && (
            <Text style={styles.message}>{finalData.message}</Text>
          )}
          
          <Text style={styles.text}>Limited Time Offer! Order Now</Text>
          <Text style={styles.text}>Free Delivery on Orders Above ₹499</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Create Promotion Template</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Template Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Upload Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"></path>
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-600 group-hover:text-gray-600">
                      {formData.image ? 'Change image' : 'Upload product image'}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    name="image"
                    accept="image/*" 
                    onChange={handleChange} 
                    className="opacity-0" 
                  />
                </label>
              </div>
              {formData.image && (
                <div className="mt-4 flex justify-center">
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-40 h-40 object-contain border rounded-md shadow-sm"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      ✓
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Price Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Original Price */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter original price"
                />
              </div>
              
              {/* Discount Price */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Discount Price (₹)
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter discount price"
                />
              </div>
            </div>
            
            {/* Message Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Promotional Message
              </label>
              <div className="mb-4">
                <select
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">-- Select a predefined message --</option>
                  {predefinedMessages.map((msg, index) => (
                    <option key={index} value={msg}>
                      {msg}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Custom Message */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Or Write Your Own Message:
                </label>
                <input
                  type="text"
                  name="customMessage"
                  value={formData.customMessage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Type custom message"
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Generate Template
              </button>
            </div>
          </form>
        </div>
        
        {/* Preview and Download Section */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Template Preview</h2>
            
            {!finalData ? (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-600">Fill out the form and click "Generate Template" to see a preview</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-4 rounded-lg mb-6 w-full max-w-md mx-auto relative overflow-hidden">
                  {/* Ribbon */}
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 transform rotate-45 translate-x-2 translate-y-2 text-xs font-bold">
                    SPECIAL OFFER
                  </div>
                  
                  <div className="text-center mb-2 bg-red-50 p-3 rounded-lg border-b-2 border-red-600">
                    <h3 className="text-2xl font-bold text-red-600 italic">Super Cake</h3>
                    <p className="text-lg font-semibold text-red-600 uppercase">Treat Yourself</p>
                  </div>
                  
                  {finalData.image && (
                    <div className="flex justify-center mb-4">
                      <img 
                        src={finalData.image} 
                        alt="Product" 
                        className="w-48 h-48 object-contain rounded-lg border-4 border-white shadow-md" 
                      />
                    </div>
                  )}
                  
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-center items-center space-x-3 mb-3 bg-yellow-50 p-2 rounded-lg">
                      <span className="text-gray-500 line-through text-lg">₹{finalData.originalPrice}</span>
                      <span className="text-red-600 font-bold text-xl">₹{finalData.discountPrice}</span>
                    </div>
                    
                    {finalData.message && (
                      <div className="bg-red-50 p-2 rounded-md text-center mb-3 border border-dashed border-red-600">
                        <p className="text-red-600 font-bold">{finalData.message}</p>
                      </div>
                    )}
                    
                    <div className="bg-green-50 p-2 rounded-lg mb-2 border border-green-100">
                      <p className="text-xs text-green-800 text-center mb-1">✓ 100% Eggless Premium Quality</p>
                      <p className="text-xs text-green-800 text-center mb-1">✓ Fresh Ingredients Guaranteed</p>
                      <p className="text-xs text-green-800 text-center">✓ Free Delivery on Orders Above ₹499</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-2 rounded-lg mt-3 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-600">Limited Time Offer! Order Now for Fast Delivery</p>
                    <p className="text-xs text-red-600 mt-1">Call: +91 9876543210 | www.supercake.com</p>
                  </div>
                </div>
                
                <PDFDownloadLink
                   document={<Invoice finalData={finalData} />}
                   fileName="promotion_template.pdf"
                   className="w-full"
                 >
                  {({ loading, error }) => (
                    <button 
                      className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-medium text-lg shadow-md flex items-center justify-center"
                      disabled={loading || error}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating PDF...
                        </>
                      ) : error ? (
                        "Error creating PDF"
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Download PDF Template
                        </>
                      )}
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
