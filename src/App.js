import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_url = 'http://localhost:5000/issues';

function App() {
  const [issues, setIssues] = useState([]);
  
  
  //fetch issues
 
  const fetchIssues = async() => {
    try {
      const response = await axios.get(api_url);
      console.log(response.data);
      setIssues([...issues, response.data]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchIssues();
  }, [])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Issue Tracker</h1>
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Issues</h2>
        <ul className="space-y-4">
          {issues.map((issue) => (
            <li
            key={issue.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-700">{issues.title}</h3>
                 <p className="text-gray-700">{issues.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
