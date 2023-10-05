import { useEffect, useState } from "react";

const ShowSelect = ({ showSelect, sessionId }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectValue, setSelectValue] = useState(0);
  useEffect(() => {
    fetch("https://animal-volunteer-server.onrender.com/sessions/volunteers")
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
  function handleChange(event) {
    setSelectValue(event.target.value);
  }
  function handleConfirmBooking() {
    if (selectValue !== 0) {
      fetch(
        `https://animal-volunteer-server.onrender.com/sessions/${sessionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ volunteer_id: selectValue }),
        }
      )
        .then((res) => {
          if (res.status === 200) {
            console.log("Booking confirmed successfully");
          } else {
            console.error("Booking confirmation failed");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error("Please select a volunteer before confirming booking");
    }
  }
  return (
    <div className={`show-select ${showSelect ? "show" : "hide"}`}>
      {showSelect && (
        <div className="select-container">
          <div className=" mt-3 text-center">
            <p>Select your name</p>
          </div>
          <select
            onChange={handleChange}
            className="form-control form-control-sm mb-3 mt-3 w-50 mx-auto"
          >
            <option value="" disabled>
              Select
            </option>
            {volunteers.map((volunteer, index) => (
              <option key={index} value={volunteer.id}>
                {volunteer.name}
              </option>
            ))}
          </select>
          <div className="mt-2 d-flex justify-content-around">
            <button className="btn btn-secondary mr-2">Register</button>
            <button className="btn btn-success" onClick={handleConfirmBooking}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowSelect;
