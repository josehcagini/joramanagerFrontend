import React from 'react';
import { Container } from './styled';

import PropTypes from 'prop-types';

export default function PesquisaGrupo({labelName, type, name, id, placeholder, value, onChange, autoComplete='off', required = false}) {

  return (
    <Container className={styles.open}>
      teste
    </Container>
  );
}

PesquisaGrupo.propTypes = {
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
