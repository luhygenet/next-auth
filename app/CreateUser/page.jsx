import React from "react";
import UserForm from "../(components)/UserForm";
//will be protected with middleware then expand it to only allow admins

const CreateUser = () => {
  return (
    <div>
      <UserForm />
    </div>
  );
};

export default CreateUser;
