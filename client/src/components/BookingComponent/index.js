import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import ListComponent from "../ListComponent";
import ContactForm from "../ContactForm";

const localizer = momentLocalizer(moment);

const BookingComponent = ({ component }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [formattedEvents, setFormattedEvents] = useState([]);
  const [bookUpdate, setBookUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/events/get-events"
        );
        if (response.status === 200) {
          console.log(response.data.events);
          setUpcomingEvents(response.data.events);

          // Format the events for react-big-calendar
          const formattedEvents = response.data.events.map((event) => ({
            title: event.eventName,
            start: new Date(event.eventDate),
            end: new Date(moment(event.eventDate).add(2, "hours")), // You can adjust the end time as needed
          }));
          setFormattedEvents(formattedEvents);
        } else {
          throw new Error("Unable to get events");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [bookUpdate]);

  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="bookingComponent">
      <h1 className="heading">
        {component === "booking" ? <>All Events</> : <>Contact Us</>}
      </h1>
      <div className="bookingContainer">
        {component === "booking" ? (
          <>
            <div className="eventList ">
              <div
                style={{ width: "100%", height: "100%", overflowY: "scroll" }}
              >
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
                        <ListComponent
                          key={index}
                          seats={event.seats}
                          event={event}
                          bookUpdate={bookUpdate}
                          setBookUpdate={setBookUpdate}
                        />
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="eventList mt-8" style={{ height: "80px" }}>
              <div
                className="flex item-center justify-center"
                style={{
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <h1
                  className="mb-2 text-black-1000"
                  style={{
                    fontSize: "25px",
                    textAlign: "justify",
                    fontWeight: "650",
                    lineHeight: "1.3",
                  }}
                >
                  <span
                    style={{
                      fontSize: "25px",
                      fontWeight: "650",
                    }}
                    className="text-black-1000"
                  >
                    Have a question or need assistance?
                  </span>
                  <span className="text-red-600">
                    <br></br>
                    <br></br>
                    We're here to help! Feel free to reach out to us
                    <br></br>for any inquiries, feedback, or support.
                  </span>
                </h1>

                <br></br>

                <div className="flex items-center mt-12">
                  <h1 style={{ fontSize: "30px", fontWeight: "700" }}>
                    <span className="text-black-900">UBooking</span>
                    <span className="text-red-600">.com</span>
                  </h1>
                  <p
                    className="mr-4 ml-4"
                    style={{ fontWeight: "800px", fontSize: "30px" }}
                  >
                    x
                  </p>
                  <img
                    style={{ height: "30px" }}
                    src="https://www.chitkara.edu.in/chitkara-university-logo.png"
                    alt="logo"
                  ></img>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="eventCalendar">
          {component === "booking" ? (
            <>
              <Calendar
                localizer={localizer}
                events={formattedEvents}
                startAccessor="start"
                endAccessor="end"
                views={["month"]}
                step={60}
                defaultDate={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
                style={{ backgroundColor: "white" }}
              />
            </>
          ) : (
            <>
              <ContactForm />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingComponent;
