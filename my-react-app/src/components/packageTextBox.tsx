import React, { useState } from 'react';

interface HeaderSectionProps {
  onScan: (packageName: string) => void;
}

const PackageTextBox: React.FC<HeaderSectionProps> = ({ onScan }) => {
  const [packageName, setPackageName] = useState('');

  const handleScan = () => {
    if (packageName.trim()) {
      onScan(packageName);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && packageName.trim()) {
      handleScan();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white px-6 py-8">
      {/* Title Section */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight text-left">
          WELCOME TO
        </h1>
        <h2 className="text-6xl font-bold text-gray-900 tracking-tight text-left pb-4">
          <span className="text-red-600">VUL</span>SCANNER
        </h2>
        <p className="text-lg font-bold text-blue-600 mt-4">
          Your APIs. Your Security. Your Peace of Mind.
        </p>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Not sure if your APIs are safe? Check your API security now with VULSCANNER,
          where safety meets simplicity
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter package name"
            className="w-full sm:flex-1 px-4 py-2 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleScan}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:ring-offset-2 transition-all duration-200 disabled:opacity-50
                     disabled:cursor-not-allowed"
            disabled={!packageName.trim()}
          >
            Scan now
          </button>
        </div>

        {/* Free Badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <svg 
            className="w-4 h-4 text-blue-600" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          <span>It's 100% free to use</span>
        </div>
      </div>
    </div>
  );
};

export default PackageTextBox;