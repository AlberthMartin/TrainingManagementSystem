#  Fullstack MERN training management system 

A modern, full-featured training management system built using the **MERN stack** —  
**MongoDB**, **Express**, **React**, and **Node.js** — with **Chakra UI** for elegant design and **JWT authentication** for secure user login and session management.

---
## Video Demo

https://youtu.be/xExpPqn2YX4

---

## Features

### User Authentication
- **Login to your personal account**  
<img width="484" height="427" alt="Screenshot 2025-08-07 at 19 57 22" src="https://github.com/user-attachments/assets/99e75dd5-3d7b-4f38-8913-6a95d122044b" />

- **Register a new account**  
<img width="453" height="356" alt="Screenshot 2025-08-07 at 19 57 46" src="https://github.com/user-attachments/assets/b6f997ae-c7cd-4914-89f4-11f420ec6722" />

---
### Workout Dashboard

- View your workouts or **start a new one** from the dashboard  
<img width="742" height="793" alt="Screenshot 2025-08-07 at 19 36 40" src="https://github.com/user-attachments/assets/2718e88a-e77d-4fbe-b631-b874631db14a" />

- Create **custom workout templates** through a clean and intuitive form — choose exercises, sets, reps, and weights

  <img width="444" height="513" alt="Screenshot 2025-08-07 at 19 35 21" src="https://github.com/user-attachments/assets/96a485ce-4ac3-43d1-8481-54ca8b85ade8" />

<img width="732" height="785" alt="Screenshot 2025-08-07 at 20 09 19" src="https://github.com/user-attachments/assets/4198bafc-35a4-4344-9962-96ca57bc960f" />

---

### Workout Details
- Click on any workout to **view all its details**  
<img width="662" height="571" alt="Screenshot 2025-08-07 at 19 37 35" src="https://github.com/user-attachments/assets/25fde856-d20b-46e0-8377-62157d8d7ff5" />

- **Active workout mode** lets you track your workout while still navigating the app. The bottom bar keeps your session accessible at all times
- 
<img width="731" height="794" alt="Screenshot 2025-08-07 at 19 48 21" src="https://github.com/user-attachments/assets/437c43c9-af08-4984-a6ba-537471b7612c" />

---

### Workout History

- All **completed workouts are saved** and viewable on the History Dashboard
<img width="453" height="262" alt="Screenshot 2025-08-07 at 19 50 56" src="https://github.com/user-attachments/assets/b762cb28-d66c-440d-a180-349afae7cc05" />

- **Edit or delete** saved workouts 

<img width="732" height="785" alt="Screenshot 2025-08-07 at 19 45 48" src="https://github.com/user-attachments/assets/07f834fc-a6c8-4a01-bb7f-403f857f01fa" />

 - You can edit and delete saved workouts

<img width="387" height="328" alt="Screenshot 2025-08-07 at 19 46 01" src="https://github.com/user-attachments/assets/a7e06ce5-5754-4a31-84d3-a49ead00f9ed" />

- View:
  - Exercise breakdowns
  - Sets, reps, and weights
  - **Training stats**: total volume, duration, and muscle group focus

<img width="731" height="787" alt="Screenshot 2025-08-07 at 19 46 20" src="https://github.com/user-attachments/assets/6d8ae392-3030-48c7-bcf0-297a6eed7ae2" />

---

- Visualize your **weekly training volume** with interactive graphs  
  *(More detailed stats coming soon)*

<img width="1114" height="790" alt="Screenshot 2025-08-13 at 18 29 26" src="https://github.com/user-attachments/assets/3765dd55-eea5-4e8b-8a80-d11259d85ae1" />


---

 ### Exercises Management
- Browse and manage your custom **exercise database**  
<img width="823" height="787" alt="Screenshot 2025-08-13 at 18 38 03" src="https://github.com/user-attachments/assets/7feb89ae-a34a-4796-9239-71bada61abb7" />


- **Create new exercises** to use in your workouts  
<img width="444" height="450" alt="Screenshot 2025-08-07 at 19 56 31" src="https://github.com/user-attachments/assets/29421134-4607-4bd9-8799-1bf44dc2a6cc" />

---

## Tech Stack

- **Frontend**: React + Chakra UI  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **Authentication**: JSON Web Tokens (JWT)

- **Database testing**: Postman


## Setup Instructions

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
