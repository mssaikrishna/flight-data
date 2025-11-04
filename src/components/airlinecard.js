import React, { useState } from 'react';

const AirlineCard = ({ airline, highlightedFields = [] }) => {
  const [expanded, setExpanded] = useState(false);

  // Filter out empty fields and basic info
  const dataFields = Object.entries(airline).filter(([key, value]) => 
    key !== 'airline_name' && 
    key !== 'url' && 
    value && 
    value.toString().trim()
  );

  const importantFields = ['baggage', 'dress_code', 'listing', 'boarding', 'check_in', 'visa'];
  const regularFields = dataFields.filter(([key]) => !importantFields.includes(key));
  const highlightedData = dataFields.filter(([key]) => highlightedFields.includes(key));
  
  // Fields to show in collapsed view
  const previewFields = dataFields
    .filter(([key]) => importantFields.includes(key))
    .slice(0, 3);

  return (
    <div className={`airline-card ${expanded ? 'expanded' : ''}`}>
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <h3>{airline.airline_name}</h3>
        <div className="card-actions">
          <span className="field-count">{dataFields.length} fields</span>
          <button className="expand-btn">
            {expanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      <div className="card-content">
        {/* Preview in collapsed state */}
        {!expanded && previewFields.length > 0 && (
          <div className="preview-fields">
            {previewFields.map(([key, value]) => (
              <div key={key} className="field-preview">
                <span className="field-name">{key.replace(/_/g, ' ')}:</span>
                <span className="field-value">
                  {value.toString().slice(0, 80)}
                  {value.toString().length > 80 && '...'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Expanded view */}
        {expanded && (
          <div className="expanded-content">
            {/* URL */}
            {airline.url && (
              <div className="field-group">
                <a 
                  href={airline.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="url-link"
                >
                  🔗 View on StaffTraveler
                </a>
              </div>
            )}

            {/* Highlighted fields */}
            {highlightedData.length > 0 && (
              <div className="field-group highlighted">
                <h4>Filtered Fields:</h4>
                {highlightedData.map(([key, value]) => (
                  <div key={key} className="field-item highlighted">
                    <strong>{key.replace(/_/g, ' ')}:</strong>
                    <div className="field-text">{value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Important fields */}
            {dataFields.filter(([key]) => importantFields.includes(key)).length > 0 && (
              <div className="field-group">
                <h4>Important Information:</h4>
                {dataFields
                  .filter(([key]) => importantFields.includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="field-item">
                      <strong>{key.replace(/_/g, ' ')}:</strong>
                      <div className="field-text">{value}</div>
                    </div>
                  ))
                }
              </div>
            )}

            {/* Other fields */}
            {regularFields.length > 0 && (
              <div className="field-group">
                <h4>Additional Information:</h4>
                {regularFields.map(([key, value]) => (
                  <div key={key} className="field-item">
                    <strong>{key.replace(/_/g, ' ')}:</strong>
                    <div className="field-text">{value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AirlineCard;