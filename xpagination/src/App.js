// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);


//   useEffect(() => {
//     fetchData();
//   }, [currentPage]);


//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const jsonData = await response.json();
//       setData(jsonData);
//     } catch (error) {
//       alert('Failed to fetch data');
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(data.length / 10)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const renderTableData = () => {
//     const startIndex = (currentPage - 1) * 10;
//     const endIndex = Math.min(startIndex + 10, data.length);
//     return data.slice(startIndex, endIndex).map((item, index) => (
//       <tr key={startIndex + index}>
//         <td>{item.id}</td>
//         <td>{item.name}</td>
//         <td>{item.email}</td>
//         <td>{item.role}</td>
//       </tr>
//     ));
//   };

//   return (
//     <div className="App">
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>{renderTableData()}</tbody>
//       </table>
//       <div className="pagination">
//         <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>Page {currentPage}</span>
//         <button onClick={handleNextPage} disabled={currentPage === Math.ceil(data.length / 10)}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;


// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert('Failed to fetch data');
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="App">
      <h1>Employee Data</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
