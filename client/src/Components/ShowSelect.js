import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ShowSelect = ({
  showSelect,
  setShowSelectMorning,
  setShowSelectEvening,
  sessionId,
  showModal,
  doShowModal,
  doHideModal,
  slotId,
  sessionDate,
}) => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectValue, setSelectValue] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const APP_URL = process.env.APP_URL;
  useEffect(() => {
    fetch(`${APP_URL}/sessions/volunteers`)
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
  }, [volunteers]);
  function handleChange(event) {
    setSelectValue(event.target.value);
  }
  const handleConfirmBooking = () => {
    if (selectValue !== null) {
      fetch(`${APP_URL}/sessions/${sessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ volunteer_id: selectValue }),
      })
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
  const isDateWithin5Days = (isoDate) => {
    const date = new Date(isoDate);
    const now = new Date();
    const fiveDaysFromNow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 5
    );

    return date < fiveDaysFromNow;
  };
  const handleCancelBooking = () => {
    doShowModal();
    console.log("sessionId ======> ", slotId);
    setSelectValue(null);
    fetch(`${APP_URL}/sessions/bookings/${slotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ volunteer_id: null }),
    })
      .then((res) => {
        console.log(res);

        if (res.status === 200 && !isDateWithin5Days(sessionDate)) {
          doHideModal();

          alert("Booking cancelled successfully");
        } else if (res.status === 200 && isDateWithin5Days(sessionDate)) {
          doHideModal();
          alert("Booking cancelled successfully");
          fetch(`${APP_URL}/sessions/cancel`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: "wywrot.paula@gmail.com",
              subject: "Booking Cancellation",
              message: `Session on ${new Date(
                sessionDate
              ).toLocaleDateString()} has been cancelled at short notice`,
            }),
          })
            .then((res) => {
              if (res.status === 200) {
                console.log("Email has been sent successfully");
                alert(
                  "The manager has been advised of this cancellation due to the short notice"
                );
              } else {
                console.error("Booking cancellation failed");
              }
            })
            .catch((err) => {
              console.error(err);
            });
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

  const doHideFormModal = () => {
    setShowFormModal(false);
  };
  const doShowFormModal = () => {
    setShowFormModal(true);
  };
  const handleInputChange = (event) => {
    if (event.target.name === "fullname") {
      setFullname(event.target.value);
    } else if (event.target.name === "phone") {
      setPhone(event.target.value);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
    }
  };
  function handleSubmit(event) {
    event.preventDefault();

    console.log("Sending data to server");

    fetch(`${APP_URL}/sessions/volunteers`, {
      method: "POST",
      body: JSON.stringify({
        name: fullname,
        phone: phone,
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setFullname("");
          setEmail("");
          setPhone("");
          doHideFormModal();

          alert("Registration completed");
        } else {
          setFullname("");
          setEmail("");
          setPhone("");
          return res.json().then((errorData) => {
            console.error("Registration failed:", errorData);
            alert(
              "Registration failed. Please check the fields have been filled in and email address has correct format i.e. test@example.com"
            );
          });
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
        alert("Error during registration");
      });
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
            <option value="">Select</option>
            {volunteers.map((volunteer, index) => (
              <option key={index} value={volunteer.id}>
                {volunteer.name}
              </option>
            ))}
          </select>
          <div className="mt-2 d-flex justify-content-around">
            <button
              className="btn btn-secondary mr-2"
              onClick={doShowFormModal}
            >
              Register
            </button>
            <button className="btn btn-success" onClick={handleConfirmBooking}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={() => doHideModal}>
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

      <Modal show={showFormModal} onHide={doHideFormModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              onChange={handleInputChange}
              value={fullname}
              placeholder="Name"
            />
            <Form.Label className="mt-3">Phone Number: </Form.Label>
            <Form.Control
              type="text"
              name="phone"
              onChange={handleInputChange}
              value={phone}
              placeholder="Phone number"
            />
            <Form.Label className="mt-3">Email address: </Form.Label>
            <Form.Control
              type="text"
              name="email"
              onChange={handleInputChange}
              value={email}
              placeholder="Email"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowSelect;
