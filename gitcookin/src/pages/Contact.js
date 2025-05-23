import React from 'react';
import './css/Contact.css';

function Contact() {
  return (
    <div className="contact, container">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Feel free to reach out with any questions, feedback, or recipe suggestions.</p>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your Name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Your Email" />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" placeholder="Your Message"></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;