import React, { useState } from "react";
import axios from 'axios';
import { notification } from "antd";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add code here to handle the form submission, e.g., sending an email or making an API request
    console.log("Email:", email);
    console.log("Message:", message);

    try {
      const response = await axios.post(
        "http://localhost:3001/suggestions/add-suggestion",
        { email: email, message: message }
      );
      if(response.status === 201) {
        openNotificationWithIcon("success", "Message published!");
        setEmail('');
        setMessage('');
      } else {
        throw new Error('Unable to publish message');
      }
    } catch (err) {
      openNotificationWithIcon("error", "Error while publishing message");
    }
  };

  return (
    <div className="rounded-lg  mt-8">
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label className="block text-black mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 bg-white rounded-md focus:outline-none focus:shadow-outline-red focus:bg-white"
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full px-3 py-2 leading-tight text-gray-700 bg-white rounded-md focus:outline-none focus:shadow-outline-red focus:bg-white"
            id="message"
            rows="4"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            className="w-full bg-red-500 text-white hover:bg-red-700 py-2 px-4 rounded-md font-semibold focus:outline-none focus:shadow-outline-red"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
