import "./Manage.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ManageLogin = () => {
  const navigate = useNavigate();
  const moveTo = () => {
    navigate("/manageSuccess");
  };

  return (
    <div className="manageLogin">
      <h2>MANAGE</h2>

      <div className="form__group field">
        <input
          type="password"
          className="form__field"
          placeholder="Name"
          name="name"
          id="code"
          required
        />
        <label for="name" className="form__label">
          CODE HERE
        </label>
      </div>

      <div className="box-1">
        <div className="btn btn-one" onClick={() => moveTo()}>
          <span>LOGIN</span>
        </div>
      </div>
    </div>
  );
};
