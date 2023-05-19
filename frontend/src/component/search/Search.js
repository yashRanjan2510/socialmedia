import React, { useState } from 'react'
import "./search.css"
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/User';
import { Button, Typography } from '@mui/material';
import User from '../user/User';

const Search = () => {
    const [name, setName] = useState("");

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
    <form className="searchForm" onSubmit={submitHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        Social Aap
      </Typography>

      <input
        type="text"
        value={name}
        placeholder="Name"
        required
        onChange={(e) => setName(e.target.value)}
      />

      <Button disabled={loading} type="submit">
        Search
      </Button>

      <div className="searchResults">
        {users &&
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))}
      </div>
    </form>
  </div>
  )
}

export default Search