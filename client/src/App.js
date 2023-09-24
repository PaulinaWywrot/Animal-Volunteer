import "./App.css";
import { useEffect, useState } from "react";
import Heading from "./Components/Heading";
import Sessions from "./Components/Sessions";
import Footer from "./Components/Footer";

function App() {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    fetch("https://animal-volunteer-server.onrender.com/sessions/")
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          throw new Error(
            `Encountered something unexpected: ${res.status} ${res.statusText}`
          );
        }
      })
      .then((data) => {
        setSessions(data);
      })
      .catch((Error) => console.log(Error));
  }, []);
  return (
    <div className="App">
      <Heading />
      <Sessions sessions={sessions} setSessions={setSessions} />
      <Footer />
    </div>
  );
}

export default App;
