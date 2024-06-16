import React from "react";

import PropTypes from 'prop-types';
import { Container } from "./styled";
import MyButton from "../MyButton";

export default function AtividadeCard({atividade, handleDeletar, handleEditar}){
  return(
    <Container>
      {atividade.titulo}
      <MyButton onClick={handleDeletar}>
        Deletar
      </MyButton>
      <MyButton onClick={handleEditar}>
        Editar
      </MyButton>
    </Container>
  )
}

AtividadeCard.propTypes = {
  atividade: PropTypes.object,
  handleDeletar: PropTypes.func,
  handleEditar: PropTypes.func
};
