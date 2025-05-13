import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const user = useLoaderData();

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedUser = { name, email };

    // update userinfo in database
    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          alert("User Updated Successfully");
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={user.name} /> <br />
        <input type="email" name="email" defaultValue={user.email} /> <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
