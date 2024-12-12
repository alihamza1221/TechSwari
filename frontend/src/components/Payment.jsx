

import React , { useState } from 'react'


export default function Payment({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the payment request to your payment processor
    console.log('Payment submitted:', formData)
    alert('Payment successful!')
    setCurrentPage('dashboard')
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Payment</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Card Number</label>
          <input type="text" className="form-control" id="cardNumber" name="cardNumber" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
          <input type="text" className="form-control" id="expiryDate" name="expiryDate" placeholder="MM/YY" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input type="text" className="form-control" id="cvv" name="cvv" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name on Card</label>
          <input type="text" className="form-control" id="name" name="name" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Pay Now</button>
      </form>
    </div>
  )
}

