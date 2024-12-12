

import React , { useState } from 'react'


export default function Login({ setCurrentPage, setUserType, setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the login request to your backend
    console.log('Login submitted:', formData)
    // For this example, we'll just set a dummy user type
    setUserType('passenger')
    setIsLoggedIn(true)
    setCurrentPage('dashboard')
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Log in to CarPool Connect</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Log In</button>
      </form>
      <p className="text-center mt-3">
        Don't have an account? <a href="#" onClick={() => setCurrentPage('signup')}>Sign up</a>
      </p>
    </div>
  )
}

