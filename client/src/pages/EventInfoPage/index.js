import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import EventComponent from "../../components/EventComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../feature/user/authSlice";

const EventInfoPage = () => {
  const [event, setEvent] = useState();
  const [booking, setBooking] = useState([]);
  const [date, setDate] = useState("");
  const id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ page: "info" }));
    const fetchEvent = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/events/get-single-event",
          id
        );
        if (response.status === 200) {
          setEvent(response.data.event);

          const isoDate = response.data.event.eventDate;

          const date = new Date(isoDate);

          const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          };
          const formattedDate = date.toLocaleString(undefined, options);
          setDate(formattedDate);
          setBooking(response.data.event.booked);
        } else {
          throw new Error("unable to fetch event");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-5/12 p-4 pl-8 pt-8 bg-white">
          <h1 className="text-2xl mb-2 font-bold">Event Details</h1>
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <form>
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
                  value={event?.hostName}
                  disabled
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-grey">Club Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={event?.clubName}
                  disabled
                />
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
              <div className="sm:col-span-3">
                <label className="block text-grey">Event Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={event?.eventName}
                  disabled
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-grey">Event Place</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={event?.eventPlace}
                  disabled
                />
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
              <div className="sm:col-span-3">
                <label className="block text-grey">Event Date</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={date}
                  disabled
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-grey">Seats Available</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded mt-1"
                  value={event?.seats}
                  disabled
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
                  value={event?.email}
                  disabled
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-grey">Contact No.</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={event?.contact}
                  disabled
                />
              </div>
            </div>
          </form>
        </div>

        <div className="w-7/12 p-4 pl-8 pt-8 bg-white">
          <h1 className="text-2xl mb-2 font-bold">Booking's</h1>
          <hr></hr>
          <hr></hr>
          <hr></hr>
          {booking.length === 0 ? (
            <>
              <div className="w-full text-black mt-4 text-center">
                No Booking's
              </div>
            </>
          ) : (
            <>
              <ul className="mt-5">
                {booking.map((booked, index) => (
                  <>
                    <li className="flex items-center justify-between h-10">
                      <p>{index + 1}</p>
                      <p>{booked?.name}</p>
                      <p>{booked?.rollno}</p>
                      <p>{booked?.email}</p>
                    </li>
                    <hr></hr>
                    <hr></hr>
                    <hr></hr>
                  </>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventInfoPage;
