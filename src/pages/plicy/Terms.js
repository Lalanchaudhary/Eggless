import React from 'react';

const Terms = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', lineHeight: '1.8' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>Terms and Conditions</h1>
    <p style={{ color: '#666', marginBottom: '2rem' }}>Last Updated: October 2025</p>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>1. Acceptance of Terms</h2>
      <p style={{ marginBottom: '1rem' }}>
        By accessing and using this website and placing orders for our eggless cakes, you accept and agree to be bound by 
        these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>2. Service Description</h2>
      <p style={{ marginBottom: '1rem' }}>
        We operate an ecommerce bakery platform specializing in fresh, eggless cakes. Our services include:
      </p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Online ordering and delivery of eggless cakes</li>
        <li>Multiple payment options: Razorpay (UPI, Cards, Net Banking), Cash on Delivery (COD), and In-App Wallet</li>
        <li>In-app wallet system for refunds and future purchases</li>
        <li>Order tracking and customer support</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>3. User Account</h2>
      <p style={{ marginBottom: '1rem' }}>
        To place orders, you must create an account with accurate information. You are responsible for:
      </p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>All activities that occur under your account</li>
        <li>Notifying us immediately of any unauthorized access</li>
        <li>Providing accurate delivery and contact information</li>
        <li>Being at least 18 years old or having parental consent</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>4. Payment Terms</h2>
      <p style={{ marginBottom: '1rem' }}><strong>Payment Methods:</strong></p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Razorpay:</strong> Secure online payments via credit/debit cards, UPI, net banking, and digital wallets</li>
        <li><strong>Cash on Delivery (COD):</strong> Pay in cash upon delivery (may have order value limits)</li>
        <li><strong>In-App Wallet:</strong> Use wallet balance accumulated through refunds or top-ups</li>
        <li><strong>Combination Payments:</strong> You may combine wallet balance with other payment methods</li>
      </ul>
      <p style={{ marginBottom: '1rem' }}>
        All prices are in Indian Rupees (INR) and include applicable taxes unless stated otherwise.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>5. In-App Wallet Terms</h2>
      <p style={{ marginBottom: '1rem' }}><strong>Critical Wallet Policy:</strong></p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>All refunds will be credited to your in-app wallet only, regardless of original payment method</li>
        <li>Wallet balance can be used for future purchases on our platform</li>
        <li>Wallet balance is non-transferable and cannot be withdrawn as cash</li>
        <li>Wallet balance cannot be transferred to bank accounts, UPI, or other payment methods</li>
        <li>Wallet balance has no expiration date</li>
        <li>You can view your wallet transaction history in your account dashboard</li>
        <li>Wallet balance can be combined with Razorpay or COD for partial payments</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>6. Order Placement and Acceptance</h2>
      <p style={{ marginBottom: '1rem' }}>
        When you place an order:
      </p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>You make an offer to purchase the products at the listed price</li>
        <li>We reserve the right to accept or reject any order</li>
        <li>Order confirmation does not guarantee acceptance</li>
        <li>We may cancel orders due to product unavailability, pricing errors, or payment issues</li>
        <li>Minimum order values may apply for certain delivery areas</li>
        <li>Advance booking required: 6 hours for standard cakes, 24-48 hours for custom cakes</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>7. Pricing and Availability</h2>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>All prices are subject to change without notice</li>
        <li>We strive to display accurate pricing, but errors may occur</li>
        <li>In case of pricing errors, we will notify you and offer the option to cancel</li>
        <li>Product availability is subject to stock and seasonal variations</li>
        <li>Custom cake prices may vary based on design complexity</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>8. Delivery Terms</h2>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Delivery is available only in specified service areas</li>
        <li>Delivery times are estimates and not guaranteed</li>
        <li>You must provide accurate delivery address and contact information</li>
        <li>Someone must be available to receive the order</li>
        <li>Failed deliveries due to incorrect information may incur additional charges</li>
        <li>Delivery charges apply based on distance and delivery type</li>
        <li>We are not liable for delays due to weather, traffic, or unforeseen circumstances</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>9. Cancellation and Refund Policy</h2>
      <p style={{ marginBottom: '1rem' }}><strong>Cancellation:</strong></p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Orders can be cancelled at least 6 hours before scheduled delivery for full refund</li>
        <li>No refund for cancellations within 6 hours of delivery time</li>
        <li>No refund if order is already out for delivery</li>
      </ul>
      <p style={{ marginBottom: '1rem' }}><strong>Refunds:</strong></p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>All refunds are credited to in-app wallet only (no UPI/bank transfers)</li>
        <li>Refund processing time: 3-5 business days for most cases</li>
        <li>Returns accepted only for quality issues, wrong orders, or damaged products</li>
        <li>Return requests must be made within 2 hours of delivery</li>
        <li>Photo evidence required for quality-related returns</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>10. Product Quality and Food Safety</h2>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>All our cakes are eggless and made with quality ingredients</li>
        <li>We follow strict food safety and hygiene standards</li>
        <li>Allergen information is provided to the best of our knowledge</li>
        <li>Customers with severe allergies should contact us before ordering</li>
        <li>Cakes are perishable and should be refrigerated upon receipt</li>
        <li>Best consumed within 24 hours of delivery</li>
        <li>We are not liable for issues arising from improper storage</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>11. Intellectual Property</h2>
      <p style={{ marginBottom: '1rem' }}>
        All content on this website, including text, images, logos, designs, and software, is our property or licensed to us. 
        You may not reproduce, distribute, or use any content without our written permission.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>12. User Conduct</h2>
      <p style={{ marginBottom: '1rem' }}>You agree not to:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Use the website for any illegal or unauthorized purpose</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Interfere with the proper functioning of the website</li>
        <li>Post false, misleading, or defamatory content</li>
        <li>Abuse our customer support or delivery personnel</li>
        <li>Attempt to manipulate wallet balance or payment systems</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>13. Limitation of Liability</h2>
      <p style={{ marginBottom: '1rem' }}>
        To the maximum extent permitted by law:
      </p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>We are not liable for indirect, incidental, or consequential damages</li>
        <li>Our total liability is limited to the amount paid for the specific order</li>
        <li>We are not responsible for issues beyond our reasonable control</li>
        <li>We do not guarantee uninterrupted or error-free service</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>14. Privacy and Data Protection</h2>
      <p style={{ marginBottom: '1rem' }}>
        Your use of our services is also governed by our Privacy Policy. We collect, use, and protect your personal 
        information as described in our Privacy Policy. By using our services, you consent to our data practices.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>15. Modifications to Terms</h2>
      <p style={{ marginBottom: '1rem' }}>
        We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon 
        posting on the website. Your continued use of our services after changes constitutes acceptance of the modified terms.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>16. Dispute Resolution</h2>
      <p style={{ marginBottom: '1rem' }}>
        In case of disputes:
      </p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>First contact our customer support for resolution</li>
        <li>We will attempt to resolve disputes amicably</li>
        <li>If unresolved, disputes will be subject to the jurisdiction of courts in [Your City]</li>
        <li>These terms are governed by the laws of India</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>17. Severability</h2>
      <p style={{ marginBottom: '1rem' }}>
        If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue 
        in full force and effect.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>18. Contact Information</h2>
      <p style={{ marginBottom: '1rem' }}>
        For questions about these Terms and Conditions:
      </p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> legal@egglesscake.com</p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> +91-XXXXXXXXXX</p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Address:</strong> [Your Business Address]</p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Support Hours:</strong> 9:00 AM - 9:00 PM (All days)</p>
    </section>

    <section style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
        By placing an order, you acknowledge that you have read, understood, and agree to these Terms and Conditions, 
        including our wallet-only refund policy.
      </p>
    </section>
  </div>
);

export default Terms;