import { ReactNode } from "react";
import { useState } from "react";
import Button from "./Button";

interface AlertProps {
  children: ReactNode;
  buttonText: string;
  onClose: () => void;
}
const Alert = ({ children, onClose }: AlertProps) => {
  return (
    <>
      <div
        className={"alert alert-warning alert-dismissible fade show"}
        role="alert"
      >
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>{children}</strong> You should check in on some of those
          fields below.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </>
  );
};

export default Alert;
