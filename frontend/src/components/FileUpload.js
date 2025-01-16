import React, { useState } from "react";

export function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading status

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onClick = async () => {
    if (!file) return; // Prevent sending empty files
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true); // Set loading to true when the upload starts

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error("Error uploading file:", error.message);
    } finally {
      setLoading(false); // Set loading to false when the upload completes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <label
        className="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input">
        Upload file
      </label>
      <input
        className="block w-full text-sm text-slate-900 border border-gray-300
         rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 m-5 p-4
          file:bg-slate-800 file:text-white file:hover:bg-slate-700 file:p-2 file:rounded"
        id="file_input"
        type="file"
        onChange={onChange}
      />
      <button
        onClick={onClick}
        className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-500"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {loading && (
        <div className="mt-4">
          <p>Loading...</p> {/* Loading widget */}
        </div>
      )}
    </div>
  );
}
