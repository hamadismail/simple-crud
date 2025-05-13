import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersData }) => {
  const initialUsers = use(usersData);
  const [users, setUsers] = useState(initialUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };

    // create user in db
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("user added successfully");
          e.target.reset();
        }
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };

  return (
    <div>
      <h2>Total Users: {users.length}</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" /> <br />
          <input type="email" name="email" /> <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email}{" "}
            <Link to={`/users/${user._id}`}>Details</Link>
            <Link to={`/update/${user._id}`}>Edit</Link>
            <button onClick={() => handleDelete(user._id)}>x</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
