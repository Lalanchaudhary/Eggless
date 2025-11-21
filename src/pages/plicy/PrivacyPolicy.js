import React from 'react';

const PrivacyPolicy = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', lineHeight: '1.8' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>Privacy Policy</h1>
    <p style={{ color: '#666', marginBottom: '2rem' }}>Last Updated: October 2025</p>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>1. Information We Collect</h2>
      <p style={{ marginBottom: '1rem' }}>We collect information to provide better services to our customers:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address</li>
        <li><strong>Payment Information:</strong> Payment method preferences (Razorpay, COD, Wallet balance)</li>
        <li><strong>Order Information:</strong> Purchase history, cake preferences, delivery details</li>
        <li><strong>Device Information:</strong> Browser type, IP address, device identifiers</li>
        <li><strong>Wallet Information:</strong> In-app wallet balance and transaction history</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>2. How We Use Your Information</h2>
      <p style={{ marginBottom: '1rem' }}>Your information is used for:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Processing and delivering your cake orders</li>
        <li>Managing payments through Razorpay, COD, or in-app wallet</li>
        <li>Processing refunds to your in-app wallet</li>
        <li>Sending order confirmations and delivery updates</li>
        <li>Improving our products and services</li>
        <li>Communicating promotional offers (with your consent)</li>
        <li>Preventing fraudulent transactions</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>3. Payment Security</h2>
      <p style={{ marginBottom: '1rem' }}>
        We take payment security seriously. All online payments are processed through Razorpay, a PCI-DSS compliant payment gateway. 
        We do not store your complete credit/debit card information on our servers. Your in-app wallet balance is securely encrypted 
        and protected.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>4. Wallet Information</h2>
      <p style={{ marginBottom: '1rem' }}>
        Your in-app wallet stores refund credits that can be used for future purchases. Wallet transactions are recorded and 
        can be viewed in your account dashboard. Wallet balances are non-transferable and cannot be withdrawn as cash.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>5. Information Sharing</h2>
      <p style={{ marginBottom: '1rem' }}>We do not sell your personal information. We may share information with:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Delivery Partners:</strong> To fulfill your orders</li>
        <li><strong>Payment Processors:</strong> Razorpay for payment processing</li>
        <li><strong>Service Providers:</strong> For website hosting and analytics</li>
        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>6. Data Security</h2>
      <p style={{ marginBottom: '1rem' }}>
        We implement industry-standard security measures to protect your personal information. This includes encryption, 
        secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>7. Cookies and Tracking</h2>
      <p style={{ marginBottom: '1rem' }}>
        We use cookies to enhance your browsing experience, remember your preferences, and analyze website traffic. 
        You can control cookie settings through your browser preferences.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>8. Your Rights</h2>
      <p style={{ marginBottom: '1rem' }}>You have the right to:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Access your personal information</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your data</li>
        <li>Opt-out of marketing communications</li>
        <li>View your wallet transaction history</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>9. Children's Privacy</h2>
      <p style={{ marginBottom: '1rem' }}>
        Our services are not directed to children under 13. We do not knowingly collect information from children under 13.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>10. Changes to Privacy Policy</h2>
      <p style={{ marginBottom: '1rem' }}>
        We may update this privacy policy from time to time. We will notify you of significant changes via email or 
        website notification.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>11. Contact Us</h2>
      <p style={{ marginBottom: '1rem' }}>
        If you have questions about this privacy policy or your personal information, please contact us at:
      </p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> privacy@egglesscake.com</p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> +91-XXXXXXXXXX</p>
    </section>
  </div>
);

export default PrivacyPolicy;