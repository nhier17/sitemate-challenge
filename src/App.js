import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_url = 'http://localhost:5000/issues';

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ title: '', description: '' });
  
  //fetch issues
  useEffect(() => {
   const fetchIssues = async() => {
    try {
      const response = await axios.get(api_url);
      console.log(response.data);
      setIssues(response.data);

    } catch (error) {
      console.error(error);
    }
  }
    fetchIssues();
  }, [])

  //create a new issue
  const createIssue = async () => {
    try {
      const response = await axios.post(api_url, newIssue);
      console.log(response.data);
      setIssues([...issues, response.data]);
      setNewIssue({title: '', description: '' })
    } catch (error) {
      console.error(error);
    }
  }

  //update an issue
  const updateIssue =async(id, updatedIssue) => {
    try {
      const response = await axios.patch(`${api_url}/${id}`, updatedIssue);
      setIssues(issues.map(issue => (issue.id === id ? response.data : issue)));
    } catch (error) {
      console.error(error);
    }
  }

  //delete an issue
  const deleteIssue = async(id) => {
    try {
      await axios.delete(`${api_url}/${id}`);
      setIssues(issues.filter(issue => issue.id!== id));
    } catch (error) {
      console.error(error);
    }

  }
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Issue Tracker</h1>
        
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create Issue</h2>
          <input
          type="text"
          placeholder="Title"
          value={newIssue.title}
          onChange={e => setNewIssue({ ...newIssue, title: e.target.value }) }
          className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
          type="text"
          placeholder="Description"
          value={newIssue.description}
          onChange={e => setNewIssue({ ...newIssue, description: e.target.value }) }
          className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
          onClick={createIssue}
           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >Create Issue</button>
        </div>

      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Issues</h2>
        <ul className="space-y-4">
          {issues.map((issue) => (
            <li
            key={issue.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-700">{issue.title}</h3>
                 <p className="text-gray-700">{issue.description}</p>
              </div>
              <div className="flex space-x-2">
              <button
              onClick={() =>
                updateIssue(issue.id, {
                  title: prompt('New title', issue.title),
                  description: prompt('New description', issue.description),
                })
              }
              className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
              >
              Update Issue
              </button>
              <button
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  onClick={() => deleteIssue(issue.id)}
                >
                  Delete Issue
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
