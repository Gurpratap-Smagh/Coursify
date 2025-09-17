# Coursify 

**Frontend**: [https://coursify-psi.vercel.app/](https://coursify-psi.vercel.app/)  

**Deployment**: Backend was first deployed on **Azure**, now runs as a **containerized image on Google Cloud**, secured with **strict IAM policies**.  
**Database**: **MongoDB**  

---

## Admin Routes

- **POST /admin/signup** — Create a new admin  
- **POST /admin/login** — Authenticate admin (headers: username, password)  
- **POST /admin/courses** — Create course (JWT required)  
- **PUT /admin/courses/:courseId** — Update course by ID (JWT required)  
- **GET /admin/courses** — List all courses (JWT required)  

---

## User Routes

- **POST /users/signup** — Create a new user  
- **POST /users/login** — Authenticate user (headers: username, password)  
- **GET /users/courses** — List all available courses (JWT required)  
- **POST /users/courses/:courseId** — Purchase a course (JWT required)  
- **GET /users/purchasedCourses** — List all purchased courses (JWT required)  

---
