import { useState } from "react";

const Button = ({ id, morning, booked }) => {
  const [buttonValue, setButtonValue] = useState(
    booked === "Booked" ? "Cancel Booking" : "Claim"
  );

  const handleClickMorning = () => {
    const newButtonValue = buttonValue === "Claim" ? "Cancel Booking" : "Claim";
    setButtonValue(newButtonValue);
    fetch(
      `https://animal-volunteer-server.onrender.com/sessions/morning/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          morning: newButtonValue === "Claim" ? "Available" : "Booked",
        }),
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const handleClickEvening = () => {
    const newButtonValue = buttonValue === "Claim" ? "Cancel Booking" : "Claim";

    setButtonValue(newButtonValue);
    fetch(
      `https://animal-volunteer-server.onrender.com/sessions/evening/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          evening: newButtonValue === "Claim" ? "Available" : "Booked",
        }),
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <button
      className={`${
        buttonValue === "Claim"
          ? "btn btn-outline-success custom-margin-left"
          : "btn btn-outline-danger custom-margin-left"
      }`}
      onClick={morning ? handleClickMorning : handleClickEvening}
    >
      {buttonValue}
    </button>
  );
};

export default Button;
