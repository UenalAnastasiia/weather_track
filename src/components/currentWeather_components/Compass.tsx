const Compass = (degree) => {

  return (
    <div>
      <div className="compass">
        <div className="compass-circle" />
        <div
          className="arrow"
          style={{ transform: `rotate(${degree.directionDegree}deg)` }}/>
      </div>
    </div>
  );
};

export default Compass;
