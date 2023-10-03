import "./App.css";
import Heading from "./Components/Heading";
import Footer from "./Components/Footer";
import CalendarComponent from "./Components/CalendarComponent";

function App() {
  return (
    <div className="bg-image">
      <Heading />
      <CalendarComponent />
      <Footer />
    </div>
  );
}

export default App;
