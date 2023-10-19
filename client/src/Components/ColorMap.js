const ColorMap = () => {
  return (
    <div className="color-map">
      <div className="color-map-item">
        <div className="color-square green" />
        <p>Both Sessions Are Available</p>
      </div>
      <div className="color-map-item">
        <div className="color-square yellow" />
        <p>One Session Is Available</p>
      </div>
      <div className="color-map-item">
        <div className="color-square grey" />
        <p>Both Sessions Are Booked</p>
      </div>
    </div>
  );
};
export default ColorMap;
