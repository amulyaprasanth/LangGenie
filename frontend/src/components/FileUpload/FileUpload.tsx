import { useState, ChangeEvent } from "react";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onClick = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error uploading file:", (error as Error).message);
    } finally {
      setLoading(false);
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
            disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {loading && (
            <div className="mt-4">
              <p>Loading...</p>
            </div>
        )}
      </div>
  );
}