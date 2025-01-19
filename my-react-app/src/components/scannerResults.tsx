import React from 'react';

interface Vulnerability {
  severity: string;
  summary: string;
  vulnerable_version_range: string;
}

interface VulnerabilityData {
  vulnerability: string;
  severity: string;
  impact: string;
  recommendations: string;
}

interface ChartSegment {
  color: string;
  label: string;
  value: number;
}

interface ScannerResultsProps {
  data: Vulnerability[];
}

const ScannerResults: React.FC<ScannerResultsProps> = ({ data }) => {
  // Process the vulnerabilities to count severity levels
  const severityCounts = data.reduce((acc, curr) => {
    acc[curr.severity] = (acc[curr.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate percentages for each severity level
  const total = data.length;
  const severityLevels: ChartSegment[] = [
    {
      label: 'Critical',
      color: '#FF6B6B',
      value: ((severityCounts['CRITICAL'] || 0) / total) * 100
    },
    {
      label: 'High',
      color: '#FFA94D',
      value: ((severityCounts['HIGH'] || 0) / total) * 100
    },
    {
      label: 'Medium',
      color: '#B197FC',
      value: ((severityCounts['MODERATE'] || 0) / total) * 100
    },
    {
      label: 'Low',
      color: '#63E6BE',
      value: ((severityCounts['LOW'] || 0) / total) * 100
    }
  ];

  // Transform vulnerabilities for the table
  const vulnerabilities: VulnerabilityData[] = data.map(v => ({
    vulnerability: v.summary,
    severity: v.severity,
    impact: `Affects versions ${v.vulnerable_version_range}`,
    recommendations: `Update to a version ${v.vulnerable_version_range.includes('<') ? 
      'higher than' : 'outside of'} ${v.vulnerable_version_range}`
  }));

  const calculateStrokeDasharray = (value: number) => {
    const circumference = 2 * Math.PI * 40;
    return `${(value / 100) * circumference} ${circumference}`;
  };

  const calculateStrokeDashoffset = (previousValues: number) => {
    const circumference = 2 * Math.PI * 40;
    return -(previousValues / 100) * circumference;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-900 mb-8">Scanner Result</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Severity Levels Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Severity Levels</h3>
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#f0f0f0" 
                  strokeWidth="10"
                />
                
                {/* Colored segments */}
                {severityLevels.map((segment, index) => {
                  const previousValues = severityLevels
                    .slice(0, index)
                    .reduce((acc, curr) => acc + curr.value, 0);
                    
                  return (
                    <circle
                      key={segment.label}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="10"
                      strokeDasharray={calculateStrokeDasharray(segment.value)}
                      strokeDashoffset={calculateStrokeDashoffset(previousValues)}
                      className="transition-all duration-500 ease-in-out"
                    />
                  );
                })}
                
                {/* Center text */}
                <g className="rotate-90">
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy=".3em"
                    className="text-3xl font-bold"
                  >
                    {total}
                  </text>
                </g>
              </svg>

              {/* Legend */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {severityLevels.map((segment) => (
                  <div key={segment.label} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {segment.label} ({severityCounts[segment.label.toUpperCase()] || 0})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vulnerability Summary Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Vulnerability Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                      Vulnerability
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                      Severity
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                      Impact
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                      Recommendations
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vulnerabilities.map((item, index) => (
                    <tr 
                      key={index}
                      className={`border-b border-gray-100 last:border-0
                        ${index % 2 === 0 ? 'bg-purple-50' : 'bg-white'}`}
                    >
                      <td className="py-3 px-4 text-sm text-gray-800">{item.vulnerability}</td>
                      <td className="py-3 px-4 text-sm text-gray-800">{item.severity}</td>
                      <td className="py-3 px-4 text-sm text-gray-800">{item.impact}</td>
                      <td className="py-3 px-4 text-sm text-gray-800">{item.recommendations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerResults;