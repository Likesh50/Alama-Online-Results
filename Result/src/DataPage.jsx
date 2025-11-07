  import React, { useState, useEffect } from 'react';
  import './DataPage.css'; // External CSS file
  import data from './data.json'; // Local data file
  import Navbar from './NavBar';

  const DataPage = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [uniqueCenters, setUniqueCenters] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 100;

    useEffect(() => {
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
        // Check if positions are null or undefined before applying localeCompare
        if (positionA && positionB) {
          return positionA.localeCompare(positionB);
        }

        // If either position is null, put it at the end
        return positionA ? -1 : 1;
      });

      // Update unique center names
      const uniqueCenters = [...new Set(sortedData.map(item => item.centre_name))];
      setUniqueCenters(uniqueCenters);

      // Filter out any rows where position is "-" or null
      const validData = sortedData.filter(row => row.position !== '-' && row.position !== null);
      setFilteredData(validData);
    }, []);

    const handleCenterSelect = (e) => {
      const center = e.target.value;
      setSelectedCenter(center);
      
      // Filter data based on the selected center
      let filtered = data.filter(row => row.position !== '-' && row.position !== null);

      // If a specific center is selected, filter by center name
      if (center) {
        filtered = filtered.filter(row => row.centre_name === center);
      }

      // Apply the sorting logic to the filtered data
      const sortPositions = ['champion', 'winner', 'runner', 'runner_1'];
      const sortedFilteredData = filtered.sort((a, b) => {
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

        // If either position is null, put it at the end
        return positionA ? -1 : 1;
      });

      setFilteredData(sortedFilteredData);
      setCurrentPage(1); // Reset to the first page when the center is changed
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
      <div >
          <Navbar/>
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
    );
  };

  export default DataPage;
