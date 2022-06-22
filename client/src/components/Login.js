import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormAction from "./FormAction";
export default function Login() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        loginState
      );
      const token = response.data.access_token;
      localStorage.setItem("access_token", token);
      navigate("/", { replace: true });
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  return (
    <form className="mt-8 space-y-6 flex flex-col" onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleChange} />
      <input type="password" name="password" onChange={handleChange} />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
