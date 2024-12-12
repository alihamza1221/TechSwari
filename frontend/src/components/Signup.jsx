

import React , { useState } from 'react'


export default function SignUp({ setCurrentPage, setUserType, setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setUserType(formData.userType)
    setIsLoggedIn(true)
    setCurrentPage('dashboard')
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Sign Up for CarPool Connect</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">I am a:</label>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="userType" id="passenger" value="passenger" required onChange={handleChange} />
            <label className="form-check-label" htmlFor="passenger">Passenger</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="userType" id="driver" value="driver" required onChange={handleChange} />
            <label className="form-check-label" htmlFor="driver">Driver</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
      <p className="text-center mt-3">
        Already have an account? <a href="#" onClick={() => setCurrentPage('login')}>Log in</a>
      </p>
    </div>
  )
}

