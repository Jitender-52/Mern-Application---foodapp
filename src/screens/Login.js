import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
  let navigate = useNavigate()
  const [credentials, Setcredentials] = useState({email:"", password:""})

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(JSON.stringify({email:credentials.email, password: credentials.password}))
        const response = await fetch("http://localhost:5000/api/login",{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert(json.errors);
        }
        if(json.success){
          localStorage.setItem("authToken", json.authToken);
          localStorage.setItem("userEmail", credentials.email);
          console.log(localStorage.getItem(json.authToken));
          navigate("/");
        }
    }
    
    const onChange = (event) =>{
        Setcredentials({...credentials, [event.target.name]: event.target.value})
    }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="m-3 btn btn-primary">Submit</button>
                <Link to="/signup" className="m-3 btn btn-danger">Don't have an account</Link>
            </form>
        </div>
    </>
  )
}


