import Button from "./Button";
const Sessions = ({ sessions }) => {
  return (
    <ul className="sessions">
      {sessions.map((session) => (
        <li className="session" key={session.id}>
          {session.date} <br /> Morning session is {session.morning} <Button />
          <br /> Evening session is {session.evening} <Button />
        </li>
      ))}
    </ul>
  );
};

export default Sessions;
