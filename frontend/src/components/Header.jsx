import React,{ useState } from 'react'

export default function Header({ isLoggedIn, setCurrentPage, setIsLoggedIn }) {
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage('home')
  }

  return (
    <header className="bg-primary text-white py-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h4 mb-0">CarPool Connect</h1>
          <nav>
            <ul className="list-unstyled d-flex mb-0">
              <li className="me-3">
                <Link href="#" onClick={() => setCurrentPage('home')} className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="me-3">
                    <Link href="#" onClick={() => setCurrentPage('dashboard')} className="text-white text-decoration-none">
                      Dashboard
                    </Link>
                  </li>
                  <li className="me-3">
                    <Link href="#" onClick={() => setCurrentPage('messaging')} className="text-white text-decoration-none">
                      Messages
                    </Link>
                  </li>
                  <li>
                    <Link href="#" onClick={handleLogout} className="text-white text-decoration-none">
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="me-3">
                    <Link href="#" onClick={() => setCurrentPage('login')} className="text-white text-decoration-none">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="#" onClick={() => setCurrentPage('signup')} className="text-white text-decoration-none">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

