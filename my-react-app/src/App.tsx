import { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css"
import PackageTextBox from "./components/packageTextBox";
import ScannerResults from "./components/scannerResults";
import AlternativePackagesTable from "./components/aiRecomendation";
import OpenAI from "openai";

const apiUrl = import.meta.env.VITE_OPENAI_API_KEY;
// console.log("api url: ", apiUrl);
const openai = new OpenAI({ apiKey: apiUrl, dangerouslyAllowBrowser: true});

function FlaskMessages() {
  const [vulnerabilityData, setVulnerabilityData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = (packageName: string, environmentName: string) => {
    console.log(environmentName)
    setLoading(true);
    setError(null);

    // Build the dynamic API URL
    const url = `http://127.0.0.1:5000/vulnerabilities/${packageName}/${environmentName}`;

    console.log(url);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(async (data) => {
        console.log("API Response:", data); // Check the structure here
        setVulnerabilityData(data);

        const aiResponse = (await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You will provide alternatives to the provided programming package in a short, concise list.",
            },
            {
              role: "user",
              content: packageName,
            },
          ],
        })).choices[0].message.content;

        setAiAdvice(aiResponse);
        setLoading(false);
        console.log("AI RESPONSE", aiResponse);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen p-4">
      <PackageTextBox onScan={handleSubmit} />
      <div className="results w-full mt-6">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && vulnerabilityData && (
          <ScannerResults data={vulnerabilityData} />
        )}
        {!loading && !error && aiAdvice && (
          <AlternativePackagesTable alternatives={aiAdvice} />
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