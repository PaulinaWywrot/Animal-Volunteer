import "./App.css";
import Heading from "./Components/Heading";
import Footer from "./Components/Footer";
import CalendarComponent from "./Components/CalendarComponent";
import MainNavbar from "./Components/MainNavbar";
import VolunteerView from "./Components/VolunteerView";
import { useState } from "react";
import About from "./Components/About";
import ManagerView from "./Components/ManagerView";

function App() {
  const [viewPage, setViewPage] = useState("About");
  const changeView = (newView) => {
    setViewPage(newView);
  };
  return (
    <div className="bg-image">
      <MainNavbar setViewPage={changeView} />
      <Heading />
      {viewPage === "About" && <About />}
      {viewPage === "Calendar" && <CalendarComponent />}
      {viewPage === "Volunteer" && <VolunteerView />}
      {viewPage === "Manager" && <ManagerView />}
      <Footer />
    </div>
  );
}

export default App;
