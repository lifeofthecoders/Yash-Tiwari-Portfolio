import React from 'react';
import { additionalTextFields } from '../utils/content';

const EditableExtras = ({ data, knownKeys = [], className = '', labelClassName = '', valueClassName = '' }) => {
  const fields = additionalTextFields(data, knownKeys);
  if (!fields.length) return null;
  return (
    <div className={className}>
      {fields.map((field) => (
        <span key={field.key}>
          <strong className={labelClassName}>{field.label}:</strong>{' '}
          <span className={valueClassName}>{field.value}</span>
        </span>
      ))}
    </div>
  );
};

export default EditableExtras;
