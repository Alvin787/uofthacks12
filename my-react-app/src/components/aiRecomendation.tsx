import React from "react";

interface AlternativePackagesTableProps {
  alternatives: string | null; // Expecting a string from AI response
}

const AlternativePackagesTable: React.FC<AlternativePackagesTableProps> = ({
  alternatives,
}) => {
  if (!alternatives) return null;

  // Split the AI response into an array by line breaks
  const rows = alternatives.split("\n").map((line) => {
    // Extract the index and name using regex
    const match = line.match(/^\d+\.\s*(.+)$/);
    return match ? match[1] : line;
  });

  return (
    <div className="w-full mt-6 text-black">
      <table className="table-auto border-collapse w-full text-left">
        <caption className="text-left text-xl font-bold mb-4">
        ⚡ AI Recommended Alternative Packages ⚡
        </caption>
        <thead>
          <tr>
            <th className="border px-4 py-2">Package Name</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((packageName, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{packageName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlternativePackagesTable;