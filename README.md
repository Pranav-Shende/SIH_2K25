# 🐄 Pashu-AI

[Deployed Project Link](https://pashu-ai1.netlify.app/)

Pashu-AI is a modern web application built with **React (frontend)** and **Flask (backend)** that leverages machine learning to identify different cattle and buffalo breeds from images and provide key breed-related insights.

---

## 🚀 Features

### Frontend (React)

* **React 18** – Concurrent rendering and improved performance
* **Vite** – Lightning-fast build tool and dev server
* **Redux Toolkit** – Simplified state management
* **TailwindCSS** – Utility-first responsive styling
* **React Router v6** – Declarative client-side routing
* **Data Visualization** – D3.js and Recharts integration
* **React Hook Form** – Efficient form handling
* **Framer Motion** – Smooth animations
* **Jest + React Testing Library** – Unit & integration testing

### Backend (Flask - `appV2`)

* **Flask API** – Handles image uploads and prediction requests
* **CORS Enabled** – Frontend-backend communication
* **TensorFlow/Keras** – Pre-trained ML model for breed classification
* **Pillow (PIL)** – Image preprocessing
* **NumPy** – Efficient numerical operations
* **Breed Database** – Provides details on milk yield, traits, and breed-specific info

---

## 📋 Prerequisites

* **Node.js** (v14.x or higher)
* **npm** or **yarn**
* **Python 3.8+**
* **pip / virtualenv**

---

## 🛠️ Installation

### Frontend (React)

```bash
# Install dependencies
npm install
# or
yarn install

# Start development server
npm start
# or
yarn start
```

### Backend (Flask)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python appV2.py
```

---

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles & Tailwind config
│   ├── App.jsx         # Main app component
│   ├── Routes.jsx      # Routing config
│   └── index.jsx       # Entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Dependencies & scripts
├── tailwind.config.js  # Tailwind config
└── vite.config.js      # Vite config

backend/
├── appV2.py            # Flask server
├── cattle_buffalo_model.h5  # (Optional ML model)
├── requirements.txt    # Python dependencies
```

---

## 🧩 Adding Routes (Frontend)

Update `Routes.jsx`:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes here
  ]);
  return element;
};
```

---

## 🎨 Styling

* **Tailwind CSS** for utility-first styling
* Plugins included:

  * Forms
  * Typography
  * Aspect Ratio
  * Container Queries
  * Fluid Typography
  * Animation utilities

---

## 📱 Responsive Design

Built with **Tailwind breakpoints** to ensure mobile-first responsiveness.

---

## 🔮 Flask API Endpoints

* `GET /` → Health check (`The server is running!`)
* `POST /predict` → Accepts an image file and returns:

```json
{
  "prediction": "Gir cattle",
  "info": {
    "milk_yield": "High",
    "traits": ["Dairy cow", "Known for high milk yield", "Distinctive domed forehead"]
  }
}
```

---

## 📦 Deployment

### Frontend

```bash
npm run build
```

Deploy build folder to **Netlify / Vercel**.

### Backend

Deploy Flask app on **Render / Heroku / AWS / GCP**.
Make sure the ML model (`cattle_buffalo_model.h5`) is included in the server environment.

### Requirements
Flask
Flask-Cors
Pillow
numpy
tensorflow
gunicorn
