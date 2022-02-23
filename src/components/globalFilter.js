import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <input
        style={{ width: "140%" }}
        className="m-2"
        placeholder="search by Name / designation / team"
        type="text"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
