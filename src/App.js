import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_url = 'http://localhost:5000/issues';

function App() {
  const [issues, setIssues] = useState([]);
  
  
  //fetch issues
  useEffect(() => {
  const fetchIssues = async() => {
    try {
      const response = await axios.get(api_url);
      console.log(response.data);
      setIssues([...issues, response.data]);
    } catch (error) {
      console.error(error);
    }
  }

    fetchIssues();
  }, [issues])
  return (
    <div className="App">
      <h1 className="text-center">Welcome!</h1>
    </div>
  );
}

export default App;
