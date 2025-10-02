"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubimt = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      const data = await res.json();
      console.log("eshi");
      console.log(data);
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <form
        method="post"
        className="flex flex-col gap-3 width-1/2"
        onSubmit={handleSubimt}
      >
        <h1>Create User</h1>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.name}
          className="border border-gray-300 rounded-md p-2"
        ></input>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.email}
          className="border border-gray-300 rounded-md p-2"
        ></input>

        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
          className="border border-gray-300 rounded-md p-2"
        ></input>
        <input
          type="submit"
          value="Create User"
          className="text-white bg-blue-500 rounded-md p-2 hover:bg-blue-700"
        />
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  );
};

export default UserForm;
