import { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css"
import PackageTextBox from "./components/packageTextBox";
import ScannerResults from "./components/scannerResults";

function FlaskMessages() {
  const [vulnerabilityData, setVulnerabilityData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = (packageName: string) => {
    setLoading(true);
    setError(null);

    // Build the dynamic API URL
    const url = `http://127.0.0.1:5000/vulnerabilities/${packageName}/NPM`;

    console.log(url);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data); // Check the structure here
        setVulnerabilityData(data[0]?.severity);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen p-4">
      <PackageTextBox onScan={handleSubmit} />
      <div className="results w-full max-w-4xl mt-6">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && vulnerabilityData && (
          <ScannerResults data={vulnerabilityData} />
        )}
      </div>
    </div>
  );
}

// Render the component
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlaskMessages />
  </StrictMode>
);

export default FlaskMessages;