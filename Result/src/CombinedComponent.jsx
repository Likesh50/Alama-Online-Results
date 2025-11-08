import React, { useState, useEffect } from 'react';
import './DataPage.css'; // External CSS file
import data from './dataa.json'; // Local data file
import logo from "./assets/logo.png";
import background from "./assets/login.jpg";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './NavBar';

const CombinedComponent = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueCenters, setUniqueCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      // Sorting positions manually to show Champion, Winner, Runner, and Runner_1 first
      const sortPositions = ['champion', 'winner', 'runner', 'runner_1'];

      // Sorting data based on the custom order for positions
      const sortedData = data.sort((a, b) => {
        const positionA = a.position;
        const positionB = b.position;

        // If both positions are in the custom order, compare their order
        if (sortPositions.includes(positionA) && sortPositions.includes(positionB)) {
          return sortPositions.indexOf(positionA) - sortPositions.indexOf(positionB);
        }

        // If one of the positions is not in the custom order, treat it as lower priority
        if (sortPositions.includes(positionA)) return -1;
        if (sortPositions.includes(positionB)) return 1;

        // Default sorting for other values
        if (positionA && positionB) {
          return positionA.localeCompare(positionB);
        }

        return positionA ? -1 : 1;
      });

      // Update unique center names
      const uniqueCenters = [...new Set(sortedData.map(item => item.centre_name))];
      setUniqueCenters(uniqueCenters);

      // Filter out any rows where position is "-" or null
      const validData = sortedData.filter(row => row.position !== '-' && row.position !== null);
      setFilteredData(validData);
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if ((username === "alama2025" && password === "center2025") || 
        (username === "center@2" && password === "pass2") || 
        (username === "center@3" && password === "pass3")) {
      toast.success('Login Successful!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
      setIsLoggedIn(true);
    } else {
      toast.error('Incorrect Credentials', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
      setError("Invalid username or password");
    }
  };

  const handleCenterSelect = (e) => {
    const center = e.target.value;
    setSelectedCenter(center);

    let filtered = data.filter(row => row.position !== '-' && row.position !== null);

    if (center) {
      filtered = filtered.filter(row => row.centre_name === center);
    }

    const sortPositions = ['Champion', 'Winner', 'Runner1', 'Runner2'];
    const sortedFilteredData = filtered.sort((a, b) => {
      const positionA = a.position;
      const positionB = b.position;

      if (sortPositions.includes(positionA) && sortPositions.includes(positionB)) {
        return sortPositions.indexOf(positionA) - sortPositions.indexOf(positionB);
      }

      if (sortPositions.includes(positionA)) return -1;
      if (sortPositions.includes(positionB)) return 1;

      if (positionA && positionB) {
        return positionA.localeCompare(positionB);
      }

      return positionA ? -1 : 1;
    });

    setFilteredData(sortedFilteredData);
    setCurrentPage(1);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Navbar />
          <div className="container">
            <h1 className="title">Final Results</h1>
            <div className="dropdown-container">
              <label htmlFor="centerSelect">Select Center:</label>
              <select id="centerSelect" value={selectedCenter} onChange={handleCenterSelect}>
                <option value="">-- All Centers --</option>
                {uniqueCenters.map((center, idx) => (
                  <option key={idx} value={center}>
                    {center}
                  </option>
                ))}
              </select>
            </div>
            <div className="table-wrapper">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Student Name</th>
                    <th>Position</th>
                    <th>Centre Name</th>
                    <th>Seat</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((row, index) => (
                    <tr key={index}>
                      <td>{indexOfFirstRecord + index + 1}</td>
                      <td>{row.name_of_students}</td>
                      <td>{row.position}</td>
                      <td>{row.centre_name}</td>
                      <td>{row.seat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredData.length > 0 && (
              <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}
            {!filteredData.length && <div className="no-data">No Data Available</div>}
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              padding: "30px",
              width: "80%",
              maxWidth: "350px",
              height: "auto",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "150px",
                height: "auto",
                marginBottom: "20px",
              }}
            />
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#1e620a",
                  color: "white",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Sign In
              </button>
              {error && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  {error}
                </p>
              )}
            </form>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default CombinedComponent;