import Button from "./Button";
const Sessions = ({ sessions }) => {
  return (
    <ul className="sessions">
      {sessions.map((session) => (
        <li className="session" key={session.id}>
          {session.date} <br /> Morning session is {session.morning}
          <Button id={session.id} morning="morning" booked={session.morning} />
          <br /> Evening session is {session.evening}
          <Button id={session.id} booked={session.evening} />
        </li>
      ))}
    </ul>
  );
};

export default Sessions;
