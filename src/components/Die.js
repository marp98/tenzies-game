import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#ccf6c8" : "#fff",
  };

  return (
    <div className="die" style={styles} onClick={props.click}>
      {props.value}
    </div>
  );
}

export default Die;
