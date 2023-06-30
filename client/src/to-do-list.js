import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
const DataTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCreateClick = () => {
    navigate("/create");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/to-do?status=${filter}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("API request error:", error);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div className="button-container">
          <button className="custom-button" onClick={handleCreateClick}>
            Create To-Do
          </button>
        </div>
        <select
          value={filter}
          onChange={handleFilterChange}
          style={{ width: "15%", marginLeft: "10px" }}
        >
          <option value="">ALL</option>
          <option value="DONE">DONE</option>
          <option value="UPCOMING">UPCOMING</option>
        </select>
      </div>
      <table>
        <tr>
          <th>S.N</th>
          <th>Name</th>
          <th>Description</th>
          <th>Date Time</th>
        </tr>
        {data?.data?.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.dateTime}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DataTable;
