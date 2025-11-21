import React from 'react';

const ShippingDelivery = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', lineHeight: '1.8' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>Shipping & Delivery Policy</h1>
    <p style={{ color: '#666', marginBottom: '2rem' }}>Last Updated: October 2025</p>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>1. Delivery Areas</h2>
      <p style={{ marginBottom: '1rem' }}>
        We currently deliver fresh eggless cakes to selected areas. Please check your pincode during checkout to confirm 
        if delivery is available in your location. We are constantly expanding our delivery zones.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>2. Delivery Time Slots</h2>
      <p style={{ marginBottom: '1rem' }}>We offer flexible delivery time slots:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Morning Slot:</strong> 9:00 AM - 12:00 PM</li>
        <li><strong>Afternoon Slot:</strong> 12:00 PM - 3:00 PM</li>
        <li><strong>Evening Slot:</strong> 3:00 PM - 6:00 PM</li>
        <li><strong>Night Slot:</strong> 6:00 PM - 9:00 PM</li>
        <li><strong>Midnight Delivery:</strong> Available for special occasions (additional charges apply)</li>
      </ul>
      <p style={{ marginBottom: '1rem' }}>
        Please select your preferred time slot during checkout. We will do our best to deliver within the chosen slot.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>3. Delivery Charges</h2>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Standard Delivery:</strong> ₹50 - ₹100 (based on distance)</li>
        <li><strong>Express Delivery:</strong> ₹150 (delivery within 2-3 hours)</li>
        <li><strong>Midnight Delivery:</strong> ₹200 (11:00 PM - 1:00 AM)</li>
        <li><strong>Free Delivery:</strong> On orders above ₹1000</li>
      </ul>
      <p style={{ marginBottom: '1rem' }}>
        Delivery charges can be paid using Razorpay, COD, or your in-app wallet balance.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>4. Order Processing Time</h2>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Standard Orders:</strong> Require minimum 6 hours advance booking</li>
        <li><strong>Custom Cakes:</strong> Require minimum 24-48 hours advance booking</li>
        <li><strong>Same-Day Delivery:</strong> Available for select cakes (subject to availability)</li>
        <li><strong>Express Orders:</strong> Delivered within 2-3 hours (limited menu, extra charges apply)</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>5. Payment Methods</h2>
      <p style={{ marginBottom: '1rem' }}>We accept the following payment methods:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Razorpay:</strong> Credit/Debit Cards, UPI, Net Banking, Wallets (Paytm, PhonePe, etc.)</li>
        <li><strong>Cash on Delivery (COD):</strong> Pay in cash when your order is delivered</li>
        <li><strong>In-App Wallet:</strong> Use your wallet balance for instant checkout</li>
        <li><strong>Combination:</strong> You can combine wallet balance with Razorpay or COD</li>
      </ul>
      <p style={{ marginBottom: '1rem', color: '#2e7d32' }}>
        <strong>Note:</strong> All refunds will be credited to your in-app wallet only, regardless of the original payment method.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>6. Delivery Process</h2>
      <ol style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Order confirmation via email and SMS</li>
        <li>Order preparation begins at our bakery</li>
        <li>Quality check before packaging</li>
        <li>Secure packaging to prevent damage</li>
        <li>Delivery partner assigned</li>
        <li>Real-time tracking available (for select areas)</li>
        <li>Delivery to your doorstep</li>
        <li>Order confirmation and feedback request</li>
      </ol>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>7. Packaging</h2>
      <p style={{ marginBottom: '1rem' }}>
        All our cakes are carefully packaged in food-grade boxes with proper cushioning to ensure they reach you in perfect condition. 
        We use eco-friendly packaging materials whenever possible. For delicate custom cakes, we use reinforced packaging.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>8. Delivery Instructions</h2>
      <p style={{ marginBottom: '1rem' }}>
        You can add special delivery instructions during checkout, such as:
      </p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Gate code or apartment number</li>
        <li>Contact person details</li>
        <li>Preferred delivery location (doorstep, reception, etc.)</li>
        <li>Call before delivery</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>9. Failed Delivery Attempts</h2>
      <p style={{ marginBottom: '1rem' }}>
        If our delivery partner is unable to reach you:
      </p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>We will attempt to contact you via phone/SMS</li>
        <li>A second delivery attempt may be made (additional charges may apply)</li>
        <li>If delivery fails after 2 attempts, the order will be cancelled</li>
        <li>Refund will be credited to your in-app wallet (minus delivery charges)</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>10. Contactless Delivery</h2>
      <p style={{ marginBottom: '1rem' }}>
        We offer contactless delivery for your safety. The delivery partner will place the order at your doorstep, 
        ring the bell, and maintain safe distance. Payment should be completed online for contactless delivery.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>11. Order Tracking</h2>
      <p style={{ marginBottom: '1rem' }}>
        Track your order status in real-time through:
      </p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Your account dashboard</li>
        <li>Email notifications</li>
        <li>SMS updates</li>
        <li>WhatsApp notifications (if opted in)</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>12. Damaged During Delivery</h2>
      <p style={{ marginBottom: '1rem' }}>
        If your cake arrives damaged, please:
      </p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Take photos of the damaged product immediately</li>
        <li>Do not accept the delivery if severely damaged</li>
        <li>Contact our support within 2 hours</li>
        <li>We will arrange a replacement or refund to your wallet</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>13. Storage Instructions</h2>
      <p style={{ marginBottom: '1rem' }}>
        Upon receiving your cake:
      </p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Refrigerate immediately if not consuming within 2 hours</li>
        <li>Best consumed within 24 hours of delivery</li>
        <li>Keep away from direct sunlight and heat</li>
        <li>Store in an airtight container after opening</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>14. Contact Delivery Support</h2>
      <p style={{ marginBottom: '1rem' }}>
        For delivery-related queries:
      </p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> delivery@egglesscake.com</p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> +91-XXXXXXXXXX</p>
      <p style={{ marginBottom: '0.5rem' }}><strong>WhatsApp:</strong> +91-XXXXXXXXXX</p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Support Hours:</strong> 9:00 AM - 9:00 PM (All days)</p>
    </section>
  </div>
);

export default ShippingDelivery;