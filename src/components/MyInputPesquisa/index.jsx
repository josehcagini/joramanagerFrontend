import React from 'react';

import PropTypes from 'prop-types';
import MyInput from '../MyInput';
import MyButton from '../MyButton';

import { FaSearch } from "react-icons/fa";
import { Container } from './styled';

export default function MyInputPesquisa({labelName, type, name, id, placeholder, value, onChange, autoComplete='off', required = false, onClick}){
  return (
  <Container>
    <MyInput
    labelName = {labelName}
    type = {type}
    name = {name}
    id = {id}
    placeholder = {placeholder}
    value = {value}
    onChange = {onChange}
    autoComplete = {autoComplete}
    required = {required}
    />
    <MyButton
      onClick={onClick}
    >
      <FaSearch />
    </MyButton>
  </Container>
  )
}

MyInputPesquisa.propTypes = {
  labelName: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  onClick: PropTypes.func,
};
