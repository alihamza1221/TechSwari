

import React,{ useState } from 'react'


export default function Dashboard({ userType, setCurrentPage }) {
  const [rides, setRides] = useState([
    { id: 1, from: 'Lahore', to: 'Faislabad', date: '2024-12-10', time: '09:00 AM', seats: 3, price: 500 },
    { id: 2, from: 'Lahore', to: 'Sialkot', date: '2024-12-11', time: '10:00 AM', seats: 2, price: 600 },
    { id: 3, from:'Karachi', to: 'Lahore', date: '2024-12-3', time: '08:00 AM', seats: 4, price: 450 },
  ])

  const [bookedRides, setBookedRides] = useState([])

  const bookRide = (ride) => {
    setBookedRides([...bookedRides, ride])
    setRides(rides.filter(r => r.id !== ride.id))
  }

  const cancelRide = (ride) => {
    setRides([...rides, ride])
    setBookedRides(bookedRides.filter(r => r.id !== ride.id))
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>
      {userType === 'passenger' ? (
        <div>
          <h3>Available Rides</h3>
          <div className="row">
            {rides.map(ride => (
              <div key={ride.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{ride.from} to {ride.to}</h5>
                    <p className="card-text">Date: {ride.date}</p>
                    <p className="card-text">Time: {ride.time}</p>
                    <p className="card-text">Available Seats: {ride.seats}</p>
                    <p className="card-text">Price: RS{ride.price}</p>
                    <button className="btn btn-primary" onClick={() => bookRide(ride)}>Book Ride</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h3 className="mt-5">Your Booked Rides</h3>
          <div className="row">
            {bookedRides.map(ride => (
              <div key={ride.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{ride.from} to {ride.to}</h5>
                    <p className="card-text">Date: {ride.date}</p>
                    <p className="card-text">Time: {ride.time}</p>
                    <button className="btn btn-danger" onClick={() => cancelRide(ride)}>Cancel Ride</button>
                    <button className="btn btn-primary ms-2" onClick={() => setCurrentPage('payment')}>Pay</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>Your Offered Rides</h3>
          <div className="row">
            {rides.map(ride => (
              <div key={ride.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{ride.from} to {ride.to}</h5>
                    <p className="card-text">Date: {ride.date}</p>
                    <p className="card-text">Time: {ride.time}</p>
                    <p className="card-text">Available Seats: {ride.seats}</p>
                    <p className="card-text">Price: ${ride.price}</p>
                    <button className="btn btn-secondary" onClick={() => setCurrentPage('messaging')}>Message Passengers</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

