import React, { useEffect, useState } from "react";
import Table from "./components/filterTable";
import HGraph from "./components/hGraph";

function App() {
  const [employeesData, setEmployeesData] = useState("");
  const [selectedDropDownValue, setSelectedDropDownValue] = useState("");
  const [filteredData, setFilteredData] = useState("");

  useEffect(() => {
    fetch("/api/employee")
      .then((res) => res.json())
      .then((json) => setEmployeesData(json.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (employeesData.length > 0) {
      if (selectedDropDownValue === "All") {
        return setFilteredData([]);
      }
      let filterData = [];
      filterData = employeesData.filter(
        (t) => t.team === selectedDropDownValue
      );
      setFilteredData(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDropDownValue]);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Designation",
      accessor: "designation",
    },
    {
      Header: "Team",
      accessor: "team",
    },
  ];

  return (
    <div class="container" style={{ maxWidth: "100%" }}>
      <div class="row">
        <div class="col-4 start-0 m-3">
          {employeesData?.length > 0 ? (
            <Table
              columns={columns}
              data={filteredData.length > 0 ? filteredData : employeesData}
              setSelectedDropDownValue={setSelectedDropDownValue}
            />
          ) : null}
        </div>
        <div class="col-6">
          <HGraph />
        </div>
      </div>
    </div>
  );
}

export default App;
