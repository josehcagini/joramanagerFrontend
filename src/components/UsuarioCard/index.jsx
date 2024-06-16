import React from "react";

import PropTypes from 'prop-types';
import { Container } from "./styled";
import MyButton from "../MyButton";

export default function UsuarioCard({usuario, handleDeletar, handleEditar}){
  return(
    <Container>
      {usuario.nome}
      <MyButton onClick={handleDeletar}>
        Deletar
      </MyButton>
      <MyButton onClick={handleEditar}>
        Editar
      </MyButton>
    </Container>
  )
}

UsuarioCard.propTypes = {
  usuario: PropTypes.object,
  handleDeletar: PropTypes.func,
  handleEditar: PropTypes.func
};
