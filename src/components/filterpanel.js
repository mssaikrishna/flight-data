import React, { useState } from 'react';

const FilterPanel = ({ allFields, selectedFields, onFieldToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter-panel">
      <button 
        className="filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        🔧 Filter by Fields ({selectedFields.length} selected)
      </button>

      {isOpen && (
        <div className="filter-dropdown">
          <div className="filter-actions">
            <button 
              onClick={() => allFields.forEach(field => onFieldToggle(field))}
              className="action-btn"
            >
              Select All
            </button>
            <button 
              onClick={() => selectedFields.forEach(field => onFieldToggle(field))}
              className="action-btn"
            >
              Clear All
            </button>
          </div>
          
          <div className="fields-grid">
            {allFields.map(field => (
              <label key={field} className="field-checkbox">
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field)}
                  onChange={() => onFieldToggle(field)}
                />
                <span>{field.replace(/_/g, ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;