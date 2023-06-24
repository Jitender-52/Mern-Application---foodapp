import React from 'react'

import { Link, useNavigate } from 'react-router-dom'


export default function Navbar() {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary">
        <div className="container-fluid navbar-dark me-auto">
            <Link className="navbar-brand" to="#">FoodApp</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
            {
              (localStorage.getItem("authToken"))
              ?<li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">My Orders</Link>
                </li>
              :""
            }
            </ul>

            {
              (!localStorage.getItem("authToken"))
              ?<div className='d-flex'>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/signup">Signup</Link>
              </div>
              :<div className='d-flex'>
                <div>
                  {/* <Link className="nav-link" to="/login" >LogOUt</Link> */}
                  {/* but we need to handle to authToken also */}
                  <div className='btn bg-white text-dark mx-2' onClick={handleLogout}>My Cart</div>
                </div>
                <div>
                  {/* <Link className="nav-link" to="/login" >LogOUt</Link> */}
                  {/* but we need to handle to authToken also */}
                  <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>LogOUt</div>
                </div>
              </div>
            }
            </div>
        </div>
        </nav>
    </>
  )
}
