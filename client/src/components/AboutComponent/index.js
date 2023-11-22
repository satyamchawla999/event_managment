import React from "react";
import {useNavigate} from 'react-router-dom'

const AboutComponent = ({ component }) => {
  const navigate = useNavigate()
  return (
    <div id="aboutSection" className="aboutSection">
      <h1 className="heading">
        {component === "about" ? <>About us</> : <>Event Places</>}
      </h1>
      <div className="aboutContainer">
        <div onClick={()=>navigate('/login')}>
          <h1>
            {component === "about" ? <>🎉 Diverse Event</> : <>Exploratorium</>}
          </h1>
          {component === "about" ? (
            <>
              <p>
                Explore a wide range of events happening in our prestigious
                halls and auditoriums. From concerts to conferences, talent
                shows to workshops, we have it all.
              </p>
            </>
          ) : (
            <>
              <img style={{width:"300px",height:"170px"}}
                src="https://pbs.twimg.com/media/DfY0iMCU8AARMxe.jpg"
                alt="#"
              ></img>
            </>
          )}
        </div>

        <div onClick={()=>navigate('/login')}>
          <h1>
            {component === "about" ? <>📅 Upcoming Calendar</> : <>Alpha Zone</>}
          </h1>
          {component === "about" ? (
            <>
              <p>
                Stay updated with our event calendar, so you never miss a beat.
                Mark your favorites and set reminders
              </p>
            </>
          ) : (
            <>
              <img style={{width:"300px",height:"170px"}}
                src="https://www.chitkara.edu.in/wp-content/uploads/2022/12/Christmas-Music-Fiesta.jpg"
                alt="#"
              ></img>
            </>
          )}
        </div>

        <div onClick={()=>navigate('/login')}>
          <h1>{component === "about" ? <>🎟️ Effortless Booking</> : <>Sportorium</>}</h1>
          {component === "about" ? (
            <>
              <p>
                Booking tickets has never been easier. With just a few clicks,
                secure your spot at the hottest events on campus.
              </p>
            </>
          ) : (
            <>
              <img style={{width:"300px",height:"170px"}}
                src="https://www.chitkara.edu.in/wp-content/themes/chitkara/images/landing-pages/glorious-future/Sportorium-pic.jpg"
                alt="#"
              ></img>
            </>
          )}
        </div>

        <div onClick={()=>navigate('/login')}>
          <h1>
            {component === "about" ? <>💬 Engagement</> : <>Gama Zone</>}
          </h1>
          {component === "about" ? (
            <>
              <p>
                Connect with fellow event enthusiasts. Share your thoughts,
                reviews, and experiences with others who share your passion.
              </p>
            </>
          ) : (
            <>
              <img style={{width:"300px",height:"170px"}}
                src="https://images.shiksha.com/mediadata/images/1575866028phpnXRTqP.jpeg"
                alt="#"
              ></img>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
