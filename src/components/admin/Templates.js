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
    console.log("Submitted Data:", updatedData);
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
  const Invoice = ({ order }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={temp} style={styles.bgImage} />
        
        <Text style={styles.superCake}>Super Cake</Text>
        <Text style={styles.treatYourself}>Treat Yourself</Text>
        
        {order.image && <Image src={order.image} style={styles.productImage} />}
        
        <View style={styles.box}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
            <Text style={[styles.priceText, styles.originalPrice]}>₹{order.originalPrice}</Text>
            <Text style={[styles.priceText, styles.discountPrice]}>₹{order.discountPrice}</Text>
          </View>
          
          {order.message && (
            <Text style={styles.message}>{order.message}</Text>
          )}
          
          <Text style={styles.text}>Limited Time Offer! Order Now</Text>
          <Text style={styles.text}>Free Delivery on Orders Above ₹499</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">Promotional Template Generator</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="lg:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Create Your Promotion</h2>
              
              {/* Image Upload */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Upload Product Image:</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                {formData.image && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600">✓ Image uploaded successfully</p>
                  </div>
                )}
              </div>

              {/* Original Price */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Original Price (₹):</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter original price"
                />
              </div>

              {/* Discount Price */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Discount Price (₹):</label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter discount price"
                />
              </div>

              {/* Dropdown Message */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Choose a Promotional Message:</label>
                <select
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">-- Select a message --</option>
                  {predefinedMessages.map((msg, index) => (
                    <option key={index} value={msg}>
                      {msg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Message */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Or Write Your Own Message:</label>
                <input
                  type="text"
                  name="customMessage"
                  value={formData.customMessage}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Type custom message"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 font-medium text-lg shadow-md"
              >
                Generate Template
              </button>
            </form>
          </div>
          
          {/* Preview & Download Section */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Template Preview</h2>
              
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
                    <div className="text-center mb-2">
                      <h3 className="text-2xl font-bold text-red-600 italic">Super Cake</h3>
                      <p className="text-lg font-semibold text-red-600">Treat Yourself</p>
                    </div>
                    
                    {finalData.image && (
                      <div className="flex justify-center mb-4">
                        <img 
                          src={finalData.image} 
                          alt="Product" 
                            onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/images/placeholder-cake.jpg";
  }}
                          className="w-48 h-48 object-contain rounded-lg border border-gray-200" 
                        />
                      </div>
                    )}
                    
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <div className="flex justify-center items-center space-x-3 mb-3">
                        <span className="text-gray-500 line-through text-lg">₹{finalData.originalPrice}</span>
                        <span className="text-red-600 font-bold text-xl">₹{finalData.discountPrice}</span>
                      </div>
                      
                      {finalData.message && (
                        <div className="bg-red-50 p-2 rounded-md text-center mb-3">
                          <p className="text-red-600 font-bold">{finalData.message}</p>
                        </div>
                      )}
                      
                      <p className="text-center font-medium">Limited Time Offer! Order Now</p>
                      <p className="text-center font-medium">Free Delivery on Orders Above ₹499</p>
                    </div>
                  </div>
                  
                  <PDFDownloadLink
                    document={<Invoice order={finalData} />}
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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
    </div>
  );
};

export default Templates;
