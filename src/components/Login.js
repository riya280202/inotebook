import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email ,password: credentials.password}) 
    })

    const json = await response.json()
    console.log(json)
    if (json.success){
        //redirect
        localStorage.setItem("token", json.authToken)
        history.push("/")

    } else{
        alert ("invalid credentials")
    }
}

const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" class="btn btn-primary" >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login
