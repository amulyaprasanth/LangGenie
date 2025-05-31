# LangGenie

**LangGenie** is a cutting-edge AI-powered language generation and translation platform that leverages modern machine learning models and retrieval tools to deliver insightful and contextually relevant outputs. This project utilizes **Chainlit** for a seamless, interactive chat-based experience with the underlying **RAG** (Retrieval-Augmented Generation) capabilities.

---

## 🌟 Features

* 🤖 **Language Generation**: Create natural, high-quality text using advanced AI models.
* 🌍 **Information Retrieval**: Retrieve up-to-date information from **Wikipedia** and **ArXiv** using specialized tools.
* ⚡️ **GROQ API Integration**: Leverage the GROQ API for enhanced performance and generation quality.
* 🧩 **LangChain** Integration: Easily build and customize complex language model pipelines.
* 💬 **Chainlit Interface**: Smooth, real-time, conversational experience.

---

## 🏗️ Tech Stack

* **Frontend**:

  * Chainlit for interactive, real-time conversations
* **Backend**:

  * Python
  * FastAPI
  * LangChain
  * GROQ API
  * Wikipedia & ArXiv retrieval tools

---

## ⚠️ Deployment Note

**This branch is not deployed.** Please run everything locally using the instructions below.

---

## 📦 Installation

### 🖥️ Prerequisites

* **Python 3.9+**
* **Poetry** for dependency management

---

### ⚙️ Setup

1. **Install Poetry (if not already installed):**

   ```bash
   pip install poetry
   ```

2. **Install project dependencies:**

   ```bash
   poetry install
   ```

3. **Configure environment variables** (add your **GROQ API key**):

   ```bash
   export GROQ_API_KEY=your_api_key_here
   ```

   Or add it to a `.env` file:

   ```env
   GROQ_API_KEY=your_api_key_here
   ```

---

### 🚀 Running the Application

To start the Chainlit-powered conversational interface, run:

```bash
poetry run chainlit run main.py
```

The Chainlit app will launch and provide a **real-time conversational interface** for interacting with LangGenie!

---

## 🧪 Testing

You can use tools like **pytest** to add automated tests for backend components and retrieval tools.

---

## 🙌 Contributing

Contributions are welcome! Here’s how:

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

**Enjoy using LangGenie with Chainlit! Let us know how we can improve.**
