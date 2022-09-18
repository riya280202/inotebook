import React from "react";

const Alert = (props) => {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0) + lower.slice(1);
  };
  return (
    <div className="alert alert-primary" role="alert">
      {props.alert && (
        <div className="{alert alert-${props.alert.type}}" role="alert">
          <strong>{capitalize(props.alert.type)}</strong> :{" "}
          {props.alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
