#  Full-stack (MERN) Gym Training Management App
Full-stack web app with **authentication** for managing **personalized workouts**, **logging workouts**, and **tracking completed workouts** and **statistics**!

---
#### [Video Demo (Youtube)](https://youtu.be/xExpPqn2YX4)

##### Here is the full link to demo: https://youtu.be/xExpPqn2YX4
---

### Tech Stack
- **Frontend**: React.js + Chakra UI  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Postman


### Features
- Secure user authentication (login & registration)
- Create and manage custom workout templates (CRUD)
- Track exercises with sets, reps, and weights during active workouts
- View and manage your full workout history (CRUD)
- Create custom exercises or use built-in defaults (CRUD)
- Training statistics with interactive graphs (in progress)

### Backend Architecture
The backend follows a clean, layered architecture commonly used in Node.js+ Express applications with MongoDB and JWT authentication. Each layer has a clear responsibility, making the system easier to maintain, scale, and test.
- **Model Layer**: Defines the MongoDB schemas and data models using Mongoose. This layer is responsible for structuring how data is stored and retrieved from the database.
- **Controller Layer**: Contains the application’s business logic. Controllers receive requests from the route layer, interact with the models, and return responses.
- **Route Layer**: Maps incoming HTTP requests to the appropriate controller functions. Routes also specify which endpoints are protected and apply the JWT authentication middleware when required.
- **Server Layer** Initializes the Express application, loads middleware, sets up routing, connects to MongoDB, and starts the server.
- **Frontend Integration** The frontend (React) communicates with the backend through REST API endpoints. State management (stores) handles API calls.

<img width="1300" height="800" alt="image" src="https://github.com/user-attachments/assets/e251e3c5-c9f3-4dea-aee2-5a0dab6238c0" />
<img width="1300" height="900" alt="image" src="https://github.com/user-attachments/assets/82478ffa-081b-4cb4-83b7-b50fd61f2fb2" />









### Setup Instructions
After you have cloned the repository
```bash
# Install backend dependencies
cd backend
npm install


# Install frontend dependencies
cd ..
cd frontend
npm install

# Start the app in dev mode (you need to configure .env files for backend)
cd backend
npm run dev

cd ..
cd frontend
npm run dev

#Now you can view the app in your browser
```
