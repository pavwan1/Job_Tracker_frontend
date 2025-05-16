import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by company or position..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      style={{
        padding: '10px',
        margin: '20px auto',
        width: '90%',
        maxWidth: '600px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '16px',
        display: 'block'
      }}
    />
  );
};

export default SearchBar;
