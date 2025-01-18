import { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function FlaskMessages() {
  const [packageName, setPackageName] = useState<string>("");
  const [ecosystem, setEcosystem] = useState<string>("");
  const [currMessage, setCurrMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    setLoading(true);
    setError(null);

    // Build the dynamic API URL
    const url = `http://127.0.0.1:5000/vulnerabilities/${packageName}/${ecosystem}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setCurrMessage(data[0]?.severity || "No vulnerabilities found.");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1>API Vulnerability Checker</h1>
      <form onSubmit={handleSubmit} className="form">
        {/* Input for package name */}
        <input
          type="text"
          value={packageName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPackageName(e.target.value)}
          placeholder="Enter package name"
          required
          className="input-field"
        />

        {/* Input for ecosystem */}
        <input
          type="text"
          value={ecosystem}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEcosystem(e.target.value)}
          placeholder="Enter ecosystem (e.g., NPM, PyPI)"
          required
          className="input-field"
        />

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Check Vulnerability
        </button>
      </form>

      {/* Display loading, error, or results */}
      <div className="results">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {currMessage && !loading && !error && (
          <p>
            <strong>Severity:</strong> {currMessage}
          </p>
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
