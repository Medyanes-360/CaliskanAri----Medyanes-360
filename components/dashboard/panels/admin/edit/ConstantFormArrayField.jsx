import React from 'react';

function ConstantFormArrayField(props) {
  const { name, fields, formData, handleChangeArray } = props;

  return (
    <>
      <h2>{name}</h2>
      {formData?.[name]?.map((_, index) => {
        return (
          <>
            <h3>
              {name} #{index}
            </h3>
            {fields?.map((field) => {
              return (
                <div className="formField">
                  <label htmlFor={`${name}-${index}-${field}`}>{field}:</label>
                  <input
                    type="text"
                    id={`${name}-${index}-${field}`}
                    name={`${name}-${index}-${field}`}
                    value={formData?.[name][index]?.[field].toString() || ''}
                    onChange={handleChangeArray}
                  />
                </div>
              );
            })}
          </>
        );
      })}
    </>
  );
}

export default ConstantFormArrayField;
