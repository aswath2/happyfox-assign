import React, { useEffect, useState } from "react";
import Table from "./components/filterTable";

function App() {
  const [movies, setMovies] = useState(null)

  useEffect(() => {
    fetch('/api/employee')
      .then(res => res.json())
      .then(json => setMovies(json.data))
      .catch(err => console.log(err))
  }, [])

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Designation',
      accessor: 'designation',
    },
    {
      Header: 'Team',
      accessor: 'team',
    },
  ]

  return (
    <div class="container" style={{ maxWidth: '100%' }}>
      <div class="row">
        <div class="col-5 start-0 m-3">
          {movies?.length > 0 ? (
            <Table columns={columns} data={movies} />
          ) : null}
        </div>
        <div class="col-6">
          graph part
        </div>
      </div>
    </div>
  );
}

export default App;
