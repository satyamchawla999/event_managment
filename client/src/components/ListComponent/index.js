import React, { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { notification } from "antd";

const ListComponent = ({ event, bookUpdate, setBookUpdate, seats }) => {
  // console.log("event name",event.name,"seats",seats)
  const isoDate = event.eventDate;
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = date.toLocaleString(undefined, options);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollno, setRollno] = useState("");

  const showModal = () => {
    setEmail("");
    setRollno("");
    setName("");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBookUpdate(!bookUpdate);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    const submitDetails = {
      name,
      email,
      rollno,
      formattedDate,
      event,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/events/book-event",
        submitDetails
      );
      if (response.status === 201) {
        openNotificationWithIcon("success", "Event Booked successfully!");
        setEmail("");
        setRollno("");
        setName("");
        handleCancel();
      } else {
        throw new Error("unable to book event");
      }
    } catch (err) {
      openNotificationWithIcon("error", "Email or Rollno already in use");
    }
  };

  return (
    <>
      {contextHolder}

      <li style={{ display: "flex" }} className="mb-2 mt-2">
        <div
          style={{
            display: "flex",
            flexGrow: "1",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p>Host Name : {event?.hostName}</p>
            <p>Event Name : {event?.eventName}</p>
            <p>Event Date : {formattedDate}</p>
            <p>Email : {event?.email}</p>
          </div>
          <div style={{ textAlign: "left" }}>
            <p>Club Name : {event?.clubName}</p>
            <p>Event Place : {event?.eventPlace}</p>
            <p>Seats Available : {event.seats}</p>
            <p>Contact : {event?.contact}</p>
          </div>
        </div>
        {seats === "0" ? (
          <>
            <button className="bg-gray-500 text-white ml-2 mr-2 p-1 rounded">
              Closed
            </button>
          </>
        ) : (
          <>
            <button
              onClick={showModal}
              className="bg-green-400 text-white ml-2 mr-2 p-1 rounded"
            >
              &nbsp;Book&nbsp;
            </button>
          </>
        )}
      </li>
      <hr></hr>
      <hr></hr>
      <hr></hr>

      <Modal
        title="Enter Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <form onSubmit={handleBook}>
          <div className="mb-4 mt-4">
            <label className="block text-grey">Your Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 mt-4">
            <label className="block text-grey">Your Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 mt-4">
            <label className="block text-grey">Your Roll no.</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 mt-4">
            <label className="block text-grey">Event Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={event.eventName}
              placeholder={event.eventName}
              disabled
              required
            />
          </div>

          <div className="mb-4 mt-4">
            <label className="block text-grey">Event Place</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={event.eventPlace}
              placeholder={event.eventPlace}
              disabled
              required
            />
          </div>

          <div className="mb-4 mt-4">
            <label className="block text-grey">Event Date</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formattedDate}
              placeholder={formattedDate}
              disabled
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 mt-4 w-full text-white p-2 rounded"
          >
            Book
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ListComponent;
