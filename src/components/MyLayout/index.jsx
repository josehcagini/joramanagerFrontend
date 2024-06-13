import React from 'react';

import Header from '../Header'
import Routes from '../../routes'
import { useSelector } from 'react-redux';

import GlobalStyles, { Container } from '../../styles/GlobalStyles';


export default function MyLayout() {

  const authState = useSelector(state => state.auth)

  return (
    <div>
      <Header authState={authState} />
      <Container>
        <Routes authState={authState} />
      </Container>
      <GlobalStyles />
    </ div>
  );
}
