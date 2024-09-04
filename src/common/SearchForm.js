import React, { useState } from "react";
import "./SearchForm.css"; 

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) { 
      searchFor(searchTerm.trim());
    }
  };

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={searchTerm}
          placeholder="Enter Search Term..."
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;

