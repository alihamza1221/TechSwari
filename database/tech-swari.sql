create database carpoolingdb

CREATE TABLE users (
    user_id INT PRIMARY KEY,               
    first_name VARCHAR(100) NOT NULL,                     
    last_name VARCHAR(100) NOT NULL,       
    email VARCHAR(255) UNIQUE NOT NULL,                    
    password_hash VARCHAR(255) NOT NULL, 
    user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('driver', 'passenger')),
    phone_number VARCHAR(15),                    
    location VARCHAR(255)                       
);

CREATE TABLE driver (
    driver_id INT PRIMARY KEY,               
    user_id INT,
	email VARCHAR(255) UNIQUE NOT NULL,                    
    password_hash VARCHAR(255) NOT NULL, 
    vehicle_registration_number VARCHAR(50),  
    FOREIGN KEY (user_id) REFERENCES users(user_id)  
);



CREATE TABLE rides (
    ride_id INT PRIMARY KEY,              
    driver_id INT NOT NULL,                              
    origin_location VARCHAR(255) NOT NULL,               
    destination_location VARCHAR(255) NOT NULL,          
    available INT NOT NULL,                        
    price DECIMAL(10, 2),                                
    FOREIGN KEY (driver_id) REFERENCES users(user_id)     
);


CREATE TABLE bookings (
    booking_id INT PRIMARY KEY,            
    ride_id INT NOT NULL,                                 
    passenger_id INT NOT NULL,                            
    booking_datetime DATETIME DEFAULT CURRENT_TIMESTAMP, 
    status VARCHAR(10) NOT NULL CHECK (status IN ('booked', 'cancelled')), 
    FOREIGN KEY (ride_id) REFERENCES rides(ride_id),       
    FOREIGN KEY (passenger_id) REFERENCES users(user_id)  
);



CREATE TABLE payments (
    payment_id INT PRIMARY KEY,            
    booking_id INT NOT NULL,                              
    amount DECIMAL(10, 2) NOT NULL,                       
    transaction_id VARCHAR(100),  
    Payment VARCHAR(10) NOT NULL CHECK (Payment IN ('Cash', 'Online')), 
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) 
);


CREATE TABLE reviews (
    review_id INT PRIMARY KEY,             
    ride_id INT NOT NULL,                                 
    reviewer_id INT NOT NULL,                             
    reviewee_id INT NOT NULL,                             
    comment TEXT,                                         
    FOREIGN KEY (ride_id) REFERENCES rides(ride_id),      
    FOREIGN KEY (reviewer_id) REFERENCES users(user_id),  
    FOREIGN KEY (reviewee_id) REFERENCES users(user_id)   
);


CREATE TABLE messages (
    message_id INT PRIMARY KEY,            
    sender_id INT NOT NULL,                               
    receiver_id INT NOT NULL,                             
    ride_id INT,                                          
    message_text TEXT NOT NULL,                           
    FOREIGN KEY (sender_id) REFERENCES users(user_id),    
    FOREIGN KEY (receiver_id) REFERENCES users(user_id),  
    FOREIGN KEY (ride_id) REFERENCES rides(ride_id)       
);


CREATE TABLE user_ratings (
    rating_id INT PRIMARY KEY,             
    user_id INT NOT NULL,                                 
    rating INT CHECK (rating >= 1 AND rating <= 5),       
    FOREIGN KEY (user_id) REFERENCES users(user_id),      
);




-- Insert sample users
INSERT INTO users (user_id, first_name, last_name, email, password_hash, user_type) VALUES
(1, 'ali', 'anwar', 'driver', 'ali@gmail.com', 'ali'),
(2, 'aqib', 'hashir', 'passenger', 'aqib@gmail.com', 'aqib');


-- Insert sample rides
INSERT INTO rides (ride_id, driver_id, origin_location, destination_location, available, price) VALUES
(1, 1, 'Downtown', 'Uptown', 3, 20.00),
(2, 1, 'Downtown', 'Suburb', 2, 15.00);


-- Insert sample bookings (after users are inserted)
INSERT INTO bookings (booking_id, ride_id, passenger_id, booking_datetime, status) VALUES
(1, 1, 2, '2024-12-05 08:00:00', 'booked'),
(3, 2, 5, '2024-12-05 10:00:00', 'cancelled');


-- Insert sample payments
INSERT INTO payments (payment_id, booking_id, amount, transaction_id, Payment) VALUES
(1, 1, 20.00, 'TXN12345', 'Online'),
(3, 4, 10.00, 'TXN12347', 'Cash');

-- Insert sample reviews
INSERT INTO reviews (review_id, ride_id, reviewer_id, reviewee_id, comment) VALUES
(2, 1, 3, 1, 'Nice ride, but could improve the timing.'),
(3, 3, 3, 4, 'Good driver, but vehicle was a bit cramped.');

-- Insert sample messages
INSERT INTO messages (message_id, sender_id, receiver_id, ride_id, message_text) 
VALUES
(1, 2, 1, 1, 'Hello, I would like to confirm the ride for today.'),
(3, 5, 4, 3, 'I have canceled my booking, please confirm.');

-- Insert sample user ratings
INSERT INTO user_ratings (rating_id, user_id, rating) VALUES
(1, 1, 5),
(2, 2, 4),
(3, 4, 3),
(4, 3, 5),
(5, 5, 4);
