import Link from 'next/link'
import React , { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home({ setCurrentPage }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const availableRides = [
    { id: 1, from: 'Lahore', to: 'Faislabad', date: '2024-12-11', time: '09:00 AM', seats: 3, price: 500 },
    { id: 2, from: 'Lahore ', to: 'Sialkot', date: '2024-12-10', time: '10:00 AM', seats: 2, price: 600 },
    { id: 3, from: 'Karachi', to: 'Lahore', date: '2024-12-3', time: '08:00 AM', seats: 4, price: 4500 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div 
        className="rounded-lg bg-cover bg-center p-8 mb-8"
        style={{
          backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtIRBKBjGPJODacfBA48r9sOMhF6z1YLuT6A&s')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        ></div>
        <h1 className="text-4xl font-bold text-white mb-4 relative" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Welcome to CarPool Connect</h1>
        <p className="text-xl text-white font-semibold mb-4 relative" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Join our community of drivers and passengers for a more sustainable and cost-effective commute.</p>
        <p className="text-lg text-white font-semibold mb-6 relative" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Sign up now to start your carpooling journey!</p>
        <Link href="#" onClick={() => setCurrentPage('signup')} className="btn btn-primary btn-lg relative">
          Get Started
        </Link>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Find a Ride</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <Input
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mb-2 md:mb-0"
                />
                <Input
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mb-2 md:mb-0"
                />
                <Button type="submit">Search Rides</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Rides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableRides.map((ride) => (
            <Card key={ride.id}>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{ride.from} to {ride.to}</h3>
                <p className="text-sm text-gray-600 mb-1">Date: {ride.date}</p>
                <p className="text-sm text-gray-600 mb-1">Time: {ride.time}</p>
                <p className="text-sm text-gray-600 mb-1">Available Seats: {ride.seats}</p>
                <p className="text-sm text-gray-600 mb-2">Price: RS.{ride.price}</p>
                <Button onClick={() => setCurrentPage('login')}>Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">For Passengers</h2>
          <p>Find convenient rides and save money on your daily commute.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">For Drivers</h2>
          <p>Offset your travel costs and reduce your carbon footprint.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Easy Communication</h2>
          <p>Stay connected with your carpool buddies through our messaging system.</p>
        </div>
      </div>
    </div>
  )
}

