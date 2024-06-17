import React from "react";

import PropTypes from 'prop-types';
import { Container } from "./styled";
import MyButton from "../MyButton";

export default function AtividadeCard({atividade, handleDeletar, handleEditar}){
  const descrcaobyStatus = new Map([
    [0, "Pendente"],
    [1, "Andamento"],
    [2, "Testando"],
    [3, "Pronto"]
  ])
  const dsStatus = descrcaobyStatus.get(atividade.status) ?? "Pendente"
  
  return(
    <Container>
      <div>
        <div>{atividade.titulo}</div>
        <div>{dsStatus}</div>
      </div>
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
