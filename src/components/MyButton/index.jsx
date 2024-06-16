import React from 'react';

import {Button} from './styled';
import PropTypes from 'prop-types';

export default function MyButton({children, onClick}) {

  return (
    <Button
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

MyButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};
