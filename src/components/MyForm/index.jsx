import React from 'react';

import {Form} from './styled';
import PropTypes from 'prop-types';

export default function MyForm({children, onSubmit}) {

  return (
    <Form onSubmit={onSubmit}>
      {children}
    </Form>
  );
}

MyForm.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func
};
