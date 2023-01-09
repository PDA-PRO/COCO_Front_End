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

      <div class="form__group field">
        <input
          type="password"
          class="form__field"
          placeholder="Name"
          name="name"
          id="code"
          required
        />
        <label for="name" class="form__label">
          CODE HERE
        </label>
      </div>

      <div class="box-1">
        <div class="btn btn-one" onClick={() => moveTo()}>
          <span>LOGIN</span>
        </div>
      </div>
    </div>
  );
};
