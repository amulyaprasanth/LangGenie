# LangGenie

**LangGenie** is a cutting-edge AI-powered language generation and translation platform. It combines modern machine learning models with an intuitive user interface to help users generate and translate text effortlessly.

---

## 🌟 Features

* ✏️ **Language Generation**: Create natural, high-quality text with the help of advanced AI models.
* 🌐 **Translation**: Translate text between multiple languages instantly.
* ⚡️ **Seamless Integration**: Frontend and backend communicate smoothly for a real-time experience.
* 🚀 **Modern Web Technologies**: Fast, responsive, and reliable user interface.

---

## 🏗️ Tech Stack

* **Frontend**:

  * React
  * Tailwind CSS
  * Vite
  * Axios

* **Backend**:

  * Python
  * FastAPI
  * Hugging Face Transformers

---

## 📂 Project Structure

```
LangGenie/
├── frontend/         # React-based UI
├── backend/          # FastAPI-powered backend
├── LICENSE
└── README.md         # Project documentation (this file)
```

---

## ⚠️ Note: Backend Service Unavailable

The backend service is currently **not working** because of **free tier limitations** on [Render.com](https://render.com). You can still explore the frontend locally or deploy your own backend instance using the provided code.

---

## ⚙️ Installation

### 🖥️ Prerequisites

* **Node.js** and **npm** (for the frontend)
* **Python 3.9+** and **pip** (for the backend)

### 🚀 Frontend Setup

```bash
cd frontend
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

The frontend will be running at [http://localhost:5173](http://localhost:5173).

### ⚙️ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```

The backend will be running at [http://localhost:8000](http://localhost:8000).

---

## 🌍 Environment Variables

### Frontend

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000
```

### Backend

Create a `.env` file in the `backend` directory if needed to store API keys or environment-specific variables.

---

## 🧪 Testing

### Frontend

```bash
npm run lint
```

(Consider adding unit tests for better code coverage.)

### Backend

You can use tools like **pytest** to add automated tests for the backend API.

---

## ⚡ Build for Production

### Frontend

```bash
npm run build
```

The production-ready frontend build will be generated in the `frontend/dist` directory.

---

## 🙌 Contributing

Contributions are welcome! Please:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed explanation.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Contact

For questions, feel free to open an issue on [GitHub](https://github.com/amulyaprasanth/LangGenie).

---

**Enjoy using LangGenie! Let us know how we can improve.**
