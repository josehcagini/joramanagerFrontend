import React, { useCallback } from 'react';
import { Container, DivBottom, DivUpper, DivMiddle } from './styled';

import PropTypes from 'prop-types';
import MyButton from '../MyButton';
import MyTable from '../MyTable';
import MyInputPesquisa from '../MyInputPesquisa';

export default function PesquisaGrupo({open, setOpenPopUp, openPopUp, handlePesquisar}) {

  const handleCancelar = useCallback((e)=>{
    e.preventDefault()
    setOpenPopUp(!openPopUp)
    }
  ,[])

  const handleOk = useCallback((e)=>{
    e.preventDefault()

    }
  ,[])

  return (
      <Container open={open} >
        <DivUpper>
          <MyInputPesquisa
            placeholder={'Pesquisa'}
            onClick={handlePesquisar}
          />
        </DivUpper>
        <DivMiddle>
          <MyTable>

          </MyTable>
        </DivMiddle>
        <DivBottom>
          <MyButton
            onClick={(e) => handleOk(e)}
          >
            OK
          </MyButton>
          <MyButton
            onClick={(e) => handleCancelar(e)}
          >
            Cancelar
          </MyButton>
        </DivBottom>
      </Container>
  );
}

PesquisaGrupo.propTypes = {
  open: PropTypes.bool,
  setOpenPopUp: PropTypes.func,
  openPopUp: PropTypes.bool,
  handlePesquisar: PropTypes.func,
};
