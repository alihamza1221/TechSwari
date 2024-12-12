

import React , { useState } from 'react'


export default function Messaging() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John', content: 'Hi, is the ride still available?' },
    { id: 2, sender: 'You', content: 'Yes, it is! Are you interested?' },
    { id: 3, sender: 'John', content: 'Great! Can you pick me up from the train station?' },
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'You', content: newMessage }])
      setNewMessage('')
    }
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Messages</h2>
      <div className="card">
        <div className="card-body" style={{ height: '400px', overflowY: 'scroll' }}>
          {messages.map(message => (
            <div key={message.id} className={`mb-3 ${message.sender === 'You' ? 'text-end' : ''}`}>
              <strong>{message.sender}: </strong>
              {message.content}
            </div>
          ))}
        </div>
        <div className="card-footer">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

