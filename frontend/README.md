# LangGenie Frontend

Welcome to the frontend of **LangGenie**, a dynamic AI-powered language generation and translation platform. This repository houses the user interface (UI) built with modern web technologies to ensure a smooth and engaging experience for end-users.

## 🚀 Features

* 🌐 **Intuitive UI**: Clean and responsive design.
* ⚡️ **Fast and Interactive**: Built with modern frameworks for performance and reliability.
* 🤖 **Connects with AI Models**: Seamlessly integrates with the LangGenie backend to enable real-time language generation and translation.

## 🛠️ Tech Stack

* **React**: UI library for building interactive and dynamic interfaces.
* **Tailwind CSS**: Utility-first CSS framework for styling.
* **Axios**: Handling API requests to the backend.
* **Vite**: Super-fast build tool for modern web projects.

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amulyaprasanth/LangGenie.git
   cd LangGenie/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be running at [http://localhost:5173](http://localhost:5173).

## ⚙️ Configuration

* The frontend uses environment variables to configure API endpoints and other settings. Create a `.env` file in the `frontend` directory with the following example content:

  ```env
  VITE_API_URL=http://localhost:8000
  ```

  Adjust the `VITE_API_URL` to point to your backend server.

## 📁 Project Structure

```
frontend/
├── public/          # Static assets
├── src/             # Source code
│   ├── assets/      # Images and icons
│   ├── components/  # Reusable components
│   ├── pages/       # Application pages
│   ├── services/    # API services
│   ├── App.jsx      # Main app component
│   ├── main.jsx     # Entry point
│   └── ...          # Other modules
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
├── package.json        # Project metadata
└── README.md           # Project documentation
```

## 🧪 Testing

To ensure everything is working as expected, run:

```bash
npm run lint
```

(Consider adding unit tests in the future for more comprehensive testing!)

## 🏗️ Build for Production

To generate an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🙌 Contributing

Contributions are welcome! Please open issues and submit pull requests to help improve the project.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
