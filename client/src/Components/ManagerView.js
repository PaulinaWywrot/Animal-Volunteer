import { useState, useEffect } from "react";
const ManagerView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [availableSessions, setAvailableSessions] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://animal-volunteer-server.onrender.com/sessions/available")
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
        setAvailableSessions(data);
        setIsLoading(false);
      })
      .catch((Error) => console.log(Error));
    setIsLoading(false);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://animal-volunteer-server.onrender.com/sessions/bookings")
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
        setBookings(data);
        setIsLoading(false);
      })
      .catch((Error) => {
        setIsLoading(false);
        console.log(Error);
      });
  }, []);
  return (
    <div>
      <div className="pb-5 mt-5">
        <h5 className="h5 mt-6">Bookings and Volunteers Details</h5>
        <table className="custom-table">
          {isLoading ? (
            <h3 className="loading">Loading...</h3>
          ) : (
            <>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Slot</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.slot}</td>
                    <td>{booking.name}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.email}</td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
      <div className="pb-5 mt-5">
        <h5 className="h5 mt-5">Available Sessions</h5>
        <table className="custom-table">
          {isLoading ? (
            <h3 className="loading">Loading...</h3>
          ) : (
            <>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Slot</th>
                </tr>
              </thead>
              <tbody>
                {availableSessions.map((session, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(session.date).toLocaleDateString()}</td>
                    <td>{session.slot}</td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
};
export default ManagerView;
