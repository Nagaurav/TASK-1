# 🔢 Factorial Calculator Web App

A responsive and user-friendly web application to calculate the factorial of a number using both **iterative** and **recursive** methods. Built with HTML, CSS, and JavaScript, this app validates user input and displays results clearly. Optional backend support is included using Node.js and Express.

---

## ✨ Features

- Calculate factorial using:
  - ✅ Iterative method
  - ✅ Recursive method
- Input validation for positive integers
- Clear display of both results
- Responsive design for all screen sizes
- Optional: Backend API for factorial computation

---

## 🧑‍💻 Technologies Used

### Frontend:
- HTML5
- CSS3 (or TailwindCSS / Bootstrap)
- JavaScript (Vanilla)

### Backend (Optional):
- Node.js
- Express.js
- REST API (`/api/factorial`)

---

## 📸 Screenshots

> _Include screenshots here showing input field, results, and responsiveness._

---

## 🚀 Live Demo

**Frontend-only version:**  
🌐 [https://yourusername.github.io/factorial-calculator](https://yourusername.github.io/factorial-calculator)

**Full-stack version (Optional):**  
🌐 [https://factorial-api-demo.render.com](https://factorial-api-demo.render.com)

---

## 📁 Project Structure

factorial-calculator/
├── index.html
├── style.css
├── script.js
├── README.md
└── (optional)
├── server.js
└── routes/
└── factorial.js

yaml
Copy
Edit

---

## 🧪 How It Works

### 1. Enter a positive integer.
### 2. Click "Calculate".
### 3. See both:
- Iterative result
- Recursive result

> Example: Input `5`  
> Output: `Iterative: 120` | `Recursive: 120`

---

## ✅ Input Validation Rules

- Only allows whole numbers ≥ 0
- Disallows:
  - Negative numbers
  - Floating point numbers
  - Non-numeric input
- Error message is shown for invalid input

---

## 🔧 Run Locally

### 👉 Frontend Only:
```bash
git clone https://github.com/yourusername/factorial-calculator.git
cd factorial-calculator
open index.html
