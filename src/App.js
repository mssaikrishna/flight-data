import React, { useState, useMemo } from 'react';
import AirlineCard from './components/airlinecard';
import SearchBar from './components/searchbar';
import FilterPanel from './components/filterpanel';
import airlinesData from './data/airlinesData.json';
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  // Get all available fields from the data
  const allFields = useMemo(() => {
    const fields = new Set();
    airlinesData.forEach(airline => {
      Object.keys(airline).forEach(field => {
        if (field !== 'airline_name' && field !== 'url' && airline[field]) {
          fields.add(field);
        }
      });
    });
    return Array.from(fields).sort();
  }, []);

  // Filter and sort airlines
  const filteredAirlines = useMemo(() => {
    let filtered = airlinesData.filter(airline => {
      const matchesSearch = airline.airline_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFields = selectedFields.length === 0 || 
        selectedFields.some(field => airline[field] && airline[field].trim());
      
      return matchesSearch && matchesFields;
    });

    // Sort the results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.airline_name.localeCompare(b.airline_name);
        case 'name-desc':
          return b.airline_name.localeCompare(a.airline_name);
        case 'fields-count':
          return (Object.keys(b).length - (b.airline_name ? 1 : 0)) - 
                 (Object.keys(a).length - (a.airline_name ? 1 : 0));
        default:
          return a.airline_name.localeCompare(b.airline_name);
      }
    });

    return filtered;
  }, [searchTerm, selectedFields, sortBy]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>✈️ StaffTraveler Airlines Database</h1>
        <p>Comprehensive staff travel information for {airlinesData.length} airlines</p>
      </header>

      <div className="controls-container">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        
        <div className="filters-sort">
          <FilterPanel
            allFields={allFields}
            selectedFields={selectedFields}
            onFieldToggle={(field) => {
              setSelectedFields(prev =>
                prev.includes(field)
                  ? prev.filter(f => f !== field)
                  : [...prev, field]
              );
            }}
          />
          
          <div className="sort-control">
            <label>Sort by: </label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="fields-count">Most Information</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-info">
        <p>Showing {filteredAirlines.length} of {airlinesData.length} airlines</p>
        {selectedFields.length > 0 && (
          <p>Filtered by: {selectedFields.join(', ')}</p>
        )}
      </div>

      <div className="airlines-grid">
        {filteredAirlines.map((airline, index) => (
          <AirlineCard 
            key={airline.airline_name + index}
            airline={airline}
            highlightedFields={selectedFields}
          />
        ))}
      </div>

      {filteredAirlines.length === 0 && (
        <div className="no-results">
          <h3>No airlines found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export default App;