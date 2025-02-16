
# Quizo - Quiz Management System

Quizo is a web-based quiz management system that allows users to create, manage, and take quizzes efficiently. The application provides a user-friendly interface for quiz management and is built using modern web technologies.

## 🚀 Live Demo
🔗 [Quizo Live Demo](https://gradesway-intern.vercel.app/)

---

## 🛠 Tech Stack Used

### Frontend:
- **React.js** - Component-based UI development
- **ShadCN UI** - Modern and clean UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Axios / Fetch API** - API interaction for frontend-backend communication

### Backend:
- **Node.js & Express.js** - Server-side development
- **TypeScript** - Strongly typed backend
- **Prisma ORM** - Database interactions
- **CRUD Operations** - Create, read, update, and delete quizzes
- **Basic Authentication** - User account creation (No JWT required)

### Database:
- **MySQL** - Relational database for quiz storage
- **Prisma ORM** - Query builder for database interactions

---

## 📜 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/01addy/Gradesway_intern.git
cd Gradesway_intern
```

### 2️⃣ Install Dependencies
#### Frontend:
```sh
cd frontend
npm install
```
#### Backend:
```sh
cd ../backend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file inside the **backend** folder and configure the following:
```
DATABASE_URL="mysql://user:password@host:port/database" 
PORT=5000
```

### 4️⃣ Start the Application
#### Run Backend:
```sh
cd backend
npm run dev
```
#### Run Frontend:
```sh
cd frontend
npm run dev
```

---

## 📌 API Documentation

### 🔹 User Authentication
- **Register a User**
  ```
  POST /api/auth/register
  ```
  **Request Body:**
  ```json
  {
    "username": "User",   // username-> admin already present in database
    "password": "password_user"   // password-> password123 already present in database
  }
  ```
  **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
        "id": --(Automatically generated),
        "username": "User"
    }
}
  ```

- **Login a User**
  ```
  POST /api/auth/login
  ```
  **Request Body:**
  ```json
  {
    "username": "User",
    "password": "password_user"
  }
  ```
  **Response:**
  ```json
  {
    "message": "Login successful",
    "user": {
        "id": --(Automatically generated),
        "username": "User"
    }
}
  ```

### 🔹 Quiz Management
- **Create a Quiz**
  ```
  POST /api/quizzes
  ```
  **Request Body:**
  ```json
  {
  "title": "ShadCN UI Basics",
  "description": "A quiz on fundamental ShadCN concepts.",
  "userId": "1"
  }
  ```
  **Response:**
  ```json
  {
    "message": "Quiz created successfully",
    "quiz": {
        "id": --,
        "title": "ShadCN UI Basics",
        "description": "A quiz on fundamental ShadCN concepts.",
        "userId": 1
    }
  }
  ```

- **Get All Quizzes**
  ```
  GET /api/quizzes
  ```
  **Response:**
  ```json
  [
    {
        "id": 1,
        "title": "History of Ancient Civilizations",
        "description": "Test your knowledge of ancient cultures, from the Egyptians to the Mayans. Can you name the pharaohs, gods, and events that shaped the ancient world?",
        "userId": 1
    },
    {
        "id": 2,
        "title": "Geography Challenge",
        "description": "Explore the world with questions on countries, capitals, landmarks, and natural wonders. How well do you know the globe?",
        "userId": 1
    },
  ] .... Plus other quizzes present in database 
  ```

- **Update a Quiz**
  ```
  PUT /api/quizzes/:id
  ```
  **Request Body:**
  ```json
  {
  "title": "Updated JavaScript Core",
  "description": "A quiz on JavaScript Core",
  "userId": "1"
  }
  ```
  **Response:**
  ```json
  {
    "message": "Quiz updated successfully",
    "updatedQuiz": {
        "id": 3,
        "title": "Updated JavaScript Core",
        "description": "A quiz on JavaScript Core",
        "userId": 1
    }
  }
  ```

- **Delete a Quiz**
  ```
  DELETE /api/quizzes/:id
  ```
  **Response:**
  ```json
  {
    "message": "Quiz deleted successfully"
  }
  ```

---

## 🌍 Deployment

- **Frontend:** Hosted on **Vercel** - [Live Link](https://gradesway-intern.vercel.app/)
- **Backend:** Hosted on **Railway** 

---

## 👨‍💻 Contributors
- **Aditya Pratap Singh** - Developer

---
