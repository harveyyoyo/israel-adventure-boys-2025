import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          🧪 Test Page
        </h1>
        
        <div className="space-y-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="font-semibold text-green-800 mb-2">✅ React is Working!</h2>
            <p className="text-green-700 text-sm">
              If you can see this page, React and the basic setup are functioning correctly.
            </p>
          </div>
          
          <div className="bg-blue-100 p-4 rounded-lg">
            <h2 className="font-semibold text-blue-800 mb-2">🎨 Tailwind CSS</h2>
            <p className="text-blue-700 text-sm">
              This styling confirms Tailwind CSS is working properly.
            </p>
          </div>
          
          <div className="bg-purple-100 p-4 rounded-lg">
            <h2 className="font-semibold text-purple-800 mb-2">📅 Camp Info</h2>
            <p className="text-purple-700 text-sm">
              Camp Sdei Chemed - Boys 2025<br/>
              "Off the Beaten Path" Summer Program
            </p>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => alert('JavaScript is working!')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Test JavaScript
            </button>
          </div>
          
          <div className="text-xs text-gray-500 text-center mt-6">
            <p>Current time: {new Date().toLocaleString()}</p>
            <p>User Agent: {navigator.userAgent.substring(0, 50)}...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 