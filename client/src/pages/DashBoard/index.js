import EventComponent from "../../components/EventComponent";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  return <div className="dashBoard">
    <Navbar/>
    <EventComponent/>
  </div>;
};

export default Dashboard;
