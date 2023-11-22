import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { placeData } from "../../constants";
import { notification } from "antd";

import { setPage } from "../../feature/user/authSlice";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import DeleteComponent from "../DeleteComponent";

const EventComponent = () => {
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState("");
  const [hostName, setHostName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [clubName, setClubName] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [update, setUpdate] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const handleDateChange = (date) => {
    setEventDate(date);
  };

  // Calculate the minimum allowed date (today's date)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    // Fetch and update upcoming events from an API or your data source

    dispatch(setPage({ page: "dashboard" }));
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/events/get-events"
        );
        if (response.status === 200) {
          console.log(response.data.events);
          setUpcomingEvents(response.data.events);
        } else {
          throw new Error("Unable to get events");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [update]);

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    // Validate and handle form submission here
    // For simplicity, we'll just add the new event to the upcomingEvents array
    const newEvent = {
      email,
      contact,
      hostName,
      clubName,
      eventName,
      eventPlace,
      eventDate,
      eventName,
      seats: seatsAvailable,
      booked: [],
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/events/add-event",
        newEvent
      );

      if (response.status === 201) {
        setUpcomingEvents([...upcomingEvents, newEvent]);
        openNotificationWithIcon("success", "Event Published successfully!");
        setUpdate(!update);
      } else {
        throw new Error("Unable to publish event");
      }
    } catch (err) {
      openNotificationWithIcon("error", "Error in publish event");
    }

    // Clear form fields
    setEmail('')
    setHostName("");
    setClubName('');
    setContact('')
    setEventName("");
    setEventPlace("");
    setEventDate("");
    setSeatsAvailable("");
  };

  const handleDeleteEvent = async (eventId) => {
    // Remove the event from the upcomingEvents array

    try {
      const response = await axios.post(
        "http://localhost:3001/events/delete-event",
        { _id: eventId }
      );
      if (response.status === 200) {
        const updatedEvents = upcomingEvents.filter(
          (event) => event._id !== eventId
        );
        openNotificationWithIcon("success", "Event deleted successfully!");
        setUpcomingEvents(updatedEvents);
      } else {
        throw new Error("Error in deleting event");
      }
    } catch (err) {
      openNotificationWithIcon("error", "Error in deleting event");
    }
  };

  return (
    <div className="flex">
      {contextHolder}

      <div className="w-7/12 p-4 bg-white">
        <h1 className="text-2xl mb-2 font-bold">Add Event</h1>
        <hr></hr>
        <hr></hr>
        <hr></hr>

        <form onSubmit={handleEventSubmit}>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
            <div className="sm:col-span-3">
              <label htmlFor="host-name" className="block text-grey">
                Host Name
              </label>

              <input
                type="text"
                name="host-name"
                id="host-name"
                className="w-full p-2 border rounded mt-1"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-grey">Club Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
            <div className="sm:col-span-3">
              <label className="block text-grey">Event Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-grey">Event Place</label>
              <select
                className="w-full p-2 border rounded mt-1"
                value={eventPlace}
                onChange={(e) => setEventPlace(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Place
                </option>
                {placeData.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
            <div className="sm:col-span-3">
              <label className="block text-grey">Event Date</label>
              <DatePicker
                selected={eventDate}
                onChange={handleDateChange}
                className="w-full p-2 border rounded mt-1"
                dateFormat="yyyy-MM-dd"
                minDate={today}
                required
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-grey">Seats Available</label>
              <input
                type="number"
                className="w-full p-2 border rounded mt-1"
                value={seatsAvailable}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (
                    newValue === "" ||
                    (parseFloat(newValue) >= 0 && !isNaN(newValue))
                  ) {
                    setSeatsAvailable(newValue);
                  }
                }}
                required
              />
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-grey">
                Email ID
              </label>

              <input
                type="email"
                name="email"
                id="email"
                className="w-full p-2 border rounded mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-grey">Contact No.</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-600 mt-4 w-full text-white p-2 rounded"
          >
            Add Event
          </button>
        </form>
      </div>
      <div className="w-5/12 p-4 bg-white">
        <h1 className="text-2xl mb-2 font-bold">Upcoming Events</h1>
        <hr></hr>
        <hr></hr>
        <hr></hr>

        <div style={{ overflowY: "scroll", height: "70vh" }}>
          {upcomingEvents.length === 0 ? (
            <>
              <div className="w-full text-black mt-4 text-center">
                No upcoming event's
              </div>
            </>
          ) : (
            <>
              <ul className="w-full mt-4">
                {upcomingEvents.map((event, index) => (
                  <DeleteComponent
                    handleDeleteEvent={handleDeleteEvent}
                    key={index}
                    event={event}
                    eventId={event._id}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
