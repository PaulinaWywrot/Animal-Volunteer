import Button from "./Button";
const Sessions = ({ sessions }) => {
  return (
    <div className="centered-container">
      <ul className="list-unstyled custom-ul">
        {sessions.map((session) => (
          <li className="session mb-4" key={session.id}>
            {session.date} <br /> Morning session is {session.morning}
            <Button
              id={session.id}
              morning="morning"
              booked={session.morning}
            />
            <br /> <br /> Evening session is {session.evening}
            <Button id={session.id} booked={session.evening} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sessions;
