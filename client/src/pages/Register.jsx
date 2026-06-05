import { useState } from "react";
import api from "../api/axios";

function Register() {
  const [name, setName] = useState("aakash");
  const [email, setEmail] = useState("test58532@gmail.com");
  const [password, setPassword] = useState("1234");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
        console.log({
            name,
            email,
            password,
        });
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Success");
      console.log(res.data);
    } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);

  alert(JSON.stringify(err.response?.data));
}
    
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
