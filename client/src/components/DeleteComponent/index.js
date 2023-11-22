import React, { useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const DeleteComponent = ({ handleDeleteEvent, event, eventId }) => {
  const navigate = useNavigate();
  const isoDate = event.eventDate;

  const date = new Date(isoDate);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = date.toLocaleString(undefined, options);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    handleDeleteEvent(eventId);
    handleCancel();
  };

  const handleNavigate = () => {
    navigate(`/event-info/${eventId}`);
  };

  return (
    <div>
      <li
        style={{ display: "flex", cursor: "pointer" }}
        onClick={handleNavigate}
        className="mb-2 mt-2"
      >
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
        <button
          onClick={showModal}
          className="bg-red-600 mr-2 text-white ml-2 p-1 rounded"
        >
          Delete
        </button>
      </li>
      <hr></hr>
      <hr></hr>
      <hr></hr>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        closable={false}
        width={400}
      >
        <div className="text-grey p-4">
          <p className="text-xl font-bold">Are you sure you want to delete?</p>
          <p className="text-sm">Name : {event?.eventName}</p>
          <p className="text-sm">Place &nbsp;: {event?.eventPlace}</p>
          <p className="text-sm">Date &nbsp;&nbsp;: {formattedDate}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteComponent;
