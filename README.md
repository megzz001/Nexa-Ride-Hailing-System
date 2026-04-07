# 🚕 Nexa – Ride Dispatch System Performance and Stress Testing

## 🔗 Tech Stack & Resources

### 🚀 Backend
- [Node.js](https://nodejs.org/) – JavaScript runtime environment  
- [Express.js](https://expressjs.com/) – Web framework for Node.js  
- [MongoDB](https://www.mongodb.com/) – NoSQL database  
- [Mongoose](https://mongoosejs.com/) – MongoDB object modeling  

### 🎨 Frontend
- [React.js](https://react.dev/) – Frontend library  
- [React Router](https://reactrouter.com/) – Routing for React apps  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework  

### 🔐 Authentication & Security
- [JWT (JSON Web Token)](https://jwt.io/) – Secure authentication  
- [bcrypt](https://www.npmjs.com/package/bcrypt) – Password hashing  
- [express-validator](https://express-validator.github.io/docs/) – Input validation  
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) – Cookie handling  

### 🌐 API & Testing
- [Axios](https://axios-http.com/) – HTTP client for API calls  
- [Postman](https://www.postman.com/) – API testing tool  

### 📊 Performance & Logging
- [Autocannon](https://github.com/mcollina/autocannon) – Load testing tool  
- [Morgan](https://github.com/expressjs/morgan) – HTTP request logger  

### 🗺️ Real-Time & Maps
- [Google Maps Platform](https://developers.google.com/maps) – Location & distance APIs  
- [Socket.io](https://socket.io/) – Real-time communication  

### 💻 Version Control
- [Git](https://git-scm.com/) – Version control system  
- [GitHub](https://github.com/) – Code hosting platform  

Nexa is a backend-focused Uber-like ride dispatch system built using a **monolithic architecture**. It simulates core functionalities such as user management, driver allocation, and ride booking within a single service.

The project is designed to analyze how monolithic systems behave under **high traffic and concurrent ride requests** using load testing tools.

---

## 📌 Features

- 🚖 Ride booking simulation
- 🧑‍🤝‍🧑 User & driver (captain) management
- ⚡ High concurrency load testing
- 📊 Performance benchmarking
- 🔍 Bottleneck detection in monolithic systems

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **Autocannon** (for load testing)
- **Morgan** (HTTP request logger)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/nexa.git
cd nexa
