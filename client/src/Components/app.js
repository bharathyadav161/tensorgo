// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState({
    to: '',
    subject: '',
    body: '',
  });

  const handleInputChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = async () => {
    try {
      // Send email information to Express.js server
      await axios.post('http://localhost:6005/api/send-email', email);

      // Clear form after sending
      setEmail({
        to: '',
        subject: '',
        body: '',
      });

      console.log('Email sent and information stored.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <h1>Email Sender</h1>
      <label>To:</label>
      <input type="text" name="to" value={email.to} onChange={handleInputChange} />
      <label>Subject:</label>
      <input type="text" name="subject" value={email.subject} onChange={handleInputChange} />
      <label>Body:</label>
      <textarea name="body" value={email.body} onChange={handleInputChange}></textarea>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default App;
