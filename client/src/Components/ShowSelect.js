import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ShowSelect = ({
  showSelect,
  setShowSelectMorning,
  setShowSelectEvening,
  sessionId,
  showModal,
  doShowModal,
  doHideModal,
  slotId,
}) => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectValue, setSelectValue] = useState(null);
  // const [ShowFormModal, setShowFormModal] = useState(false);
  // const doShowFormModal = () => {
  //   setShowFormModal(true);
  // };
  // const doHideFormModal = () => {
  //   setShowFormModal(false);
  // };
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
  const handleConfirmBooking = () => {
    if (selectValue !== null) {
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
            setShowSelectEvening(false);
            setShowSelectMorning(false);
            alert("Booking confirmed successfully");
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
  };
  const handleCancelBooking = () => {
    doShowModal();
    console.log("sessionId ======> ", slotId);
    setSelectValue(null);
    fetch(
      `https://animal-volunteer-server.onrender.com/sessions/bookings/${slotId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ volunteer_id: null }),
      }
    )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          doHideModal();

          alert("Booking cancelled successfully");
        } else {
          return res.json().then((errorData) => {
            console.error("Booking cancellation failed:", errorData);
            alert("Booking cancellation failed");
          });
        }
      })
      .catch((err) => {
        console.error("Error during booking cancellation:", err);
        alert("Error during booking cancellation");
      });
  };

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

      <Modal show={showModal} onHide={doHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel the booking?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={doHideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCancelBooking}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowSelect;
