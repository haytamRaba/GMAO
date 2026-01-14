import React from 'react';
import './Table.css';

/**
 * Table Component
 * Reusable table component for displaying data in a structured format
 * Supports custom column rendering and row actions
 * 
 * @param {Array} data - Array of objects to display
 * @param {Array} columns - Column configuration [{key, label, render}]
 * @param {Array|Function} actions - Actions for each row (edit, delete, etc.)
 */
const Table = ({ data, columns, actions }) => {
  /**
   * Render cell content with custom renderer if provided
   */
  const renderCell = (item, column) => {
    const value = item[column.key];
    
    if (column.render) {
      return column.render(value, item);
    }
    
    return value;
  };

  /**
   * Get actions for a specific row
   * Actions can be an array or a function that returns an array
   */
  const getRowActions = (item) => {
    if (typeof actions === 'function') {
      return actions(item);
    }
    return actions || [];
  };

  if (!data || data.length === 0) {
    return (
      <div className="table-container">
        <div className="table-empty">
          <p>📭 Aucune donnée à afficher</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              {getRowActions(data[0]).length > 0 && (
                <th className="actions-column">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const rowActions = getRowActions(item);
              return (
                <tr key={item.id || index}>
                  {columns.map((column) => (
                    <td key={column.key} data-label={column.label}>
                      {renderCell(item, column)}
                    </td>
                  ))}
                  {rowActions.length > 0 && (
                    <td className="actions-cell" data-label="Actions">
                      <div className="action-buttons">
                        {rowActions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(item)}
                            className={`action-btn ${action.className || ''}`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
