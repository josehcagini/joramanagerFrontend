import React from 'react';
import {Input, Label, Container} from './styled';

import PropTypes from 'prop-types';

export default function MyInput({labelName, type, name, id, placeholder, value, onChange, autoComplete='off', required = false}) {

  return (
    <Container>
      {
        labelName &&
        <Label
          htmlFor={id}
        >
          {labelName}
        </Label>
      }

      <Input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
      />
    </Container>
  );
}

MyInput.propTypes = {
  labelName: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
};
