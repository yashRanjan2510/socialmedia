import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import "./updatepassword.css"
import { updatePassword } from '../../actions/User';

const Updatepassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
  
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, loading, message } = useSelector((state) => state.like);
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(updatePassword(oldPassword, newPassword));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch({ type: "clearErrors" });
      }
  
      if (message) {
        alert.success(message);
        dispatch({ type: "clearMessage" });
      }
    }, [dispatch, error, alert, message]);
  
  return (
    <div className="updatePassword">
    <form className="updatePasswordForm" onSubmit={submitHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        Social Aap
      </Typography>

      <input
        type="password"
        placeholder="Old Password"
        required
        value={oldPassword}
        className="updatePasswordInputs"
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        required
        className="updatePasswordInputs"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <Button disabled={loading} type="submit">
        Change Password
      </Button>
    </form>
  </div>

  )
}

export default Updatepassword