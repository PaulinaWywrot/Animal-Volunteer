import { useState } from "react";
const Button = ({ id, morning }) => {
  const [buttonValue, setButtonValue] = useState("Claim");

  const handleClickMorning = () => {
    console.log({ id });

    setButtonValue("Cancel Booking");
    fetch(
      `https://animal-volunteer-server.onrender.com/sessions/morning/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ morning: "Booked" }),
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
    console.log({ id });

    setButtonValue("Cancel Booking");
    fetch(
      `https://animal-volunteer-server.onrender.com/sessions/evening/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ evening: "Booked" }),
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
      className="button"
      onClick={morning ? handleClickMorning : handleClickEvening}
    >
      {buttonValue}
    </button>
  );
};
export default Button;
