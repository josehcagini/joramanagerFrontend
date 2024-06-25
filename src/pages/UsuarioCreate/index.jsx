import React, { useCallback, useState } from 'react';
import getErrorMessage from '../../utils/getErrorMessage';
import axios from '../../services/axios';
import history from '../../services/history';

import MyInput from '../../components/MyInput';
import MyForm from '../../components/MyForm';


import {Container, FundoPreto} from './styled.js';
import PesquisaGrupo from '../../components/PesquisaGrupo';
import MyInputPesquisa from '../../components/MyInputPesquisa';
import MyButton from '../../components/MyButton';

export default function UsuarioCreate() {

  const [error, setError] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [grupoId, setGrupo] = useState(0);
  const [openPopUp, setOpenPopUp] = useState(false)

  const handleSubmit = useCallback( async (e) => {

    e.preventDefault();
    setError('');

    function validarUsuario({nome, senha}){
      console.log(nome, !nome || nome.length < 6)
      if(!nome || nome.length < 6) {
        throw new Error('nome precisa ter mais que 6 caracteres')
      }
      if(!senha || senha.length < 6) {
        throw new Error('senha precisa ter mais que 6 caracteres')
      }
    }

    try {

      const usuario = {
        nome,
        senha,
        grupoId: Number(grupoId) === 0 ? null : Number(grupoId)
      }

      validarUsuario(usuario)

      const response = await axios.post('/usuario', {usuario})

      const novoUsuario = response.data.novoUsuario

      if (novoUsuario){
        history.push('/', {novoUsuario})
        history.go(0)
      }

    } catch (err) {
      let message;
      message = getErrorMessage(err)
      setError( message || 'Falha ao criar usuario')
    }

  }, [nome, senha, grupoId])

  const handleAbrePopUp = useCallback( async(e) => {
    e.preventDefault()

    setOpenPopUp(!openPopUp)

  }, [openPopUp])

  const handlePesquisa = useCallback( async(e) => {


  }, )

  return (
    <>
      { openPopUp && <FundoPreto open={true} >
        <Container>
          <MyForm onSubmit={handleSubmit}>
            <h1 style={{margin: `8px`}}>Usuario</h1>
            {
              error &&
              <p>{error}</p>
            }
            <MyInput
              labelName="Nome"
              type="text"
              name="nome"
              id="nome"
              placeholder='Nome do usuario'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <MyInput
              labelName="Senha"
              type="password"
              name="senha"
              id="senha"
              placeholder='Senha do usuario'
              autoComplete='off'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <MyInputPesquisa
              labelName="Grupo"
              type="text"
              name="grupo"
              id="grupo"
              placeholder='Grupo do usuario'
              value={grupoId}
              onChange={(e) => setGrupo(e.target.value)}
              onClick={(e)=> handleAbrePopUp(e)}
            />
            <MyButton type="submit">Salvar</MyButton>
          </MyForm>
          <PesquisaGrupo
            open={true}
            openPopUp={openPopUp}
            setOpenPopUp={setOpenPopUp}
            handlePesquisar={(e) => handlePesquisa(e)}
          />

        </Container>
      </FundoPreto> }

      { !openPopUp &&
        <Container>
          <MyForm onSubmit={handleSubmit}>
            <h1 style={{margin: `8px`}}>Usuario</h1>
            {
              error &&
              <p>{error}</p>
            }
            <MyInput
              labelName="Nome"
              type="text"
              name="nome"
              id="nome"
              placeholder='Nome do usuario'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <MyInput
              labelName="Senha"
              type="password"
              name="senha"
              id="senha"
              placeholder='Senha do usuario'
              autoComplete='off'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <MyInputPesquisa
              labelName="Grupo"
              type="text"
              name="grupo"
              id="grupo"
              placeholder='Grupo do usuario'
              value={grupoId}
              onChange={(e) => setGrupo(e.target.value)}
              onClick={(e)=> handleAbrePopUp(e)}
            />
            <MyButton type="submit">Salvar</MyButton>
          </MyForm>
        </Container> }

    </>
  );
}
