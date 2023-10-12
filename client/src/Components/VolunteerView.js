import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const VolunteerView = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectValue, setSelectValue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [volunteerBookings, setVolunteerBookings] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3007/sessions/volunteers")
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
        setVolunteers(data);
      })
      .catch((Error) => console.log(Error));
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
        console.log("bookings", bookings);
      })
      .catch((Error) => {
        setIsLoading(false);
        console.log(Error);
      });
  }, [selectValue]);
  function handleChange(event) {
    const selectedValue = Number(event.target.value);
    setSelectValue(selectedValue);
    const volunteerBookingsData = bookings.filter(
      (booking) => booking.volunteer_id === selectedValue
    );
    console.log("vol", volunteerBookingsData);
    console.log("ev", typeof selectedValue);

    setVolunteerBookings(volunteerBookingsData);
  }

  return (
    <div>
      <div className="pb-5">
        <div className=" mt-3 text-center">
          <h5>Select your name</h5>
        </div>
        <select
          onChange={handleChange}
          className="form-control form-control-sm mb-3 mt-3 w-50 mx-auto"
        >
          <option value="">Select</option>
          {volunteers.map((volunteer, index) => (
            <option key={index} value={volunteer.id}>
              {volunteer.name}
            </option>
          ))}
        </select>
        <h5 className="h5">Your Bookings:</h5>
        <Table size="sm" className="custom-table">
          {isLoading ? (
            <h3>Loading...</h3>
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
                {volunteerBookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.slot}</td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </Table>
      </div>
    </div>
  );
};
export default VolunteerView;
