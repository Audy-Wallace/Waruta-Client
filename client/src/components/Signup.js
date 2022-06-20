import { useState } from "react";
import FormAction from "./FormAction";
import axios from "axios";
export default function Signup() {
  const [signupState, setSignupState] = useState({
    username: "",
    email: "",
    password: "",
    img: null,
  });
  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/signup",
        signupState
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="mt-8 space-y-6 flex flex-col" onSubmit={handleSubmit}>
        <input type="file" id="img" name="img" accept="image/*" />
        <input onChange={handleChange} name="username" type="text" />
        <input onChange={handleChange} name="email" type="text" />
        <input onChange={handleChange} name="password" type="password" />
        <FormAction handleSubmit={handleSubmit} text="Signup" />
    </form>
  );
}
