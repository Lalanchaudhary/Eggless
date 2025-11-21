import React from 'react';

const RefundPolicy = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', lineHeight: '1.8' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>Refund & Return Policy</h1>
    <p style={{ color: '#666', marginBottom: '2rem' }}>Last Updated: October 2025</p>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>1. Refund Method - In-App Wallet Only</h2>
      <p style={{ marginBottom: '1rem' }}>
        <strong>Important:</strong> All refunds for returned products will be credited to your in-app wallet, regardless of your original payment method 
        (Razorpay, COD, or Wallet). Refunds will NOT be processed to UPI, bank accounts, or credit/debit cards.
      </p>
      <p style={{ marginBottom: '1rem' }}>
        Your wallet balance can be used for future cake orders on our platform. This policy ensures faster refund processing 
        and encourages continued patronage of our bakery.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>2. Eligibility for Returns</h2>
      <p style={{ marginBottom: '1rem' }}>We accept returns under the following conditions:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Quality Issues:</strong> If the cake is damaged, spoiled, or not fresh upon delivery</li>
        <li><strong>Wrong Order:</strong> If you received a different cake than what you ordered</li>
        <li><strong>Missing Items:</strong> If parts of your order are missing</li>
        <li><strong>Allergic Concerns:</strong> If the cake contains undisclosed allergens</li>
        <li><strong>Time Frame:</strong> Return requests must be made within 2 hours of delivery</li>
      </ul>
      <p style={{ marginBottom: '1rem', color: '#d32f2f' }}>
        <strong>Note:</strong> Due to the perishable nature of our products, we cannot accept returns for change of mind, 
        taste preferences, or after the cake has been consumed.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>3. Return Process</h2>
      <p style={{ marginBottom: '1rem' }}>To initiate a return:</p>
      <ol style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Contact our customer support within 2 hours of delivery</li>
        <li>Provide your order number and photos of the issue</li>
        <li>Our team will review your request within 24 hours</li>
        <li>If approved, we may arrange for product pickup or ask you to dispose of it</li>
        <li>Refund will be credited to your in-app wallet within 3-5 business days</li>
      </ol>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>4. Refund Processing Time</h2>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li><strong>Wallet Credits:</strong> 3-5 business days after approval</li>
        <li><strong>COD Orders:</strong> Full amount credited to wallet within 3-5 business days</li>
        <li><strong>Razorpay Orders:</strong> Full amount credited to wallet within 3-5 business days</li>
        <li><strong>Wallet Payments:</strong> Refunded to wallet within 1-3 business days</li>
      </ul>
      <p style={{ marginBottom: '1rem' }}>
        You will receive an email and in-app notification once the refund is processed to your wallet.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>5. Using Your Wallet Balance</h2>
      <p style={{ marginBottom: '1rem' }}>Your wallet balance can be used for:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Purchasing any cakes from our menu</li>
        <li>Paying for delivery charges</li>
        <li>Combining with other payment methods (Razorpay or COD)</li>
        <li>Future orders with no expiration date</li>
      </ul>
      <p style={{ marginBottom: '1rem', color: '#d32f2f' }}>
        <strong>Important:</strong> Wallet balance is non-transferable and cannot be withdrawn as cash or transferred to bank accounts/UPI.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>6. Partial Refunds</h2>
      <p style={{ marginBottom: '1rem' }}>
        Partial refunds may be issued to your wallet if only part of your order is affected. For example, if you ordered 
        multiple cakes and only one has quality issues, we will refund only that item to your wallet.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>7. Non-Refundable Situations</h2>
      <p style={{ marginBottom: '1rem' }}>Refunds will not be provided for:</p>
      <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
        <li>Change of mind after delivery</li>
        <li>Subjective taste preferences</li>
        <li>Delay in delivery due to incorrect address provided by customer</li>
        <li>Cakes that have been partially or fully consumed</li>
        <li>Return requests made after 2 hours of delivery</li>
        <li>Custom cakes (unless there's a quality issue)</li>
      </ul>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>8. Cancellation Policy</h2>
      <p style={{ marginBottom: '1rem' }}>
        <strong>Before Preparation:</strong> Full refund to wallet if cancelled at least 6 hours before delivery time.
      </p>
      <p style={{ marginBottom: '1rem' }}>
        <strong>After Preparation:</strong> No refund if cancelled within 6 hours of delivery time, as the cake is already prepared.
      </p>
      <p style={{ marginBottom: '1rem' }}>
        <strong>During Delivery:</strong> No refund if the order is already out for delivery.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>9. Damaged During Delivery</h2>
      <p style={{ marginBottom: '1rem' }}>
        If your cake is damaged during delivery, please take photos immediately and contact us within 2 hours. 
        We will either send a replacement (if available) or issue a full refund to your wallet.
      </p>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#444' }}>10. Contact for Refunds</h2>
      <p style={{ marginBottom: '1rem' }}>
        For any refund or return queries, please contact us:
      </p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> refunds@egglesscake.com</p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> +91-XXXXXXXXXX</p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Support Hours:</strong> 9:00 AM - 9:00 PM (All days)</p>
    </section>
  </div>
);

export default RefundPolicy;