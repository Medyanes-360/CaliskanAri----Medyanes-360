import React from 'react';

function ConstantFormField(props) {
  const { name, fields, formData, handleChange } = props;

  return (
    <>
      <h2>{name}</h2>
      {fields?.map((field) => {
        return (
          <div className="formField">
            <label htmlFor={`${name}-${field}`}>{field}:</label>
            <input
              type="text"
              id={`${name}-${field}`}
              name={`${name}-${field}`}
              value={formData?.[name]?.[field] || ''}
              onChange={handleChange}
            />
          </div>
        );
      })}
    </>
  );
}

export default ConstantFormField;
