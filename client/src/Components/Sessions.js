import Button from "./Button";
import { useEffect, useState } from "react";
const Sessions = () => {
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
  }, [sessions]);

  return (
    <div className="centered-container">
      <ul className="list-unstyled custom-ul mt-5">
        {sessions.map((session) => (
          <li className="session mb-4" key={session.id}>
            <strong>{session.date}</strong> <br /> Morning session is{" "}
            <strong>{session.morning}</strong>
            <Button
              id={session.id}
              morning="morning"
              booked={session.morning}
            />
            <br /> <br /> Evening session is <strong>{session.evening}</strong>
            <Button id={session.id} booked={session.evening} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sessions;
