import React, { useCallback, useEffect, useState } from 'react';
import getErrorMessage from '../../utils/getErrorMessage';
import axios from '../../services/axios';
import history from '../../services/history';

import MyInput from '../../components/MyInput';
import MyForm from '../../components/MyForm';


import {Container} from './styled'
import MyButton from '../../components/MyButton';
import { useLocation, useParams } from 'react-router-dom';

export default function UsuarioEdit() {

  const localtionPath = useLocation()
  const state = localtionPath?.state  || {}
  const params = useParams()
  const usuarioIdParams = params.usuarioId

  const [usuarioEdit, setUsuarioEdit] = useState( {...(state?.usuarioEdit || {}), senha: ''} )

  const [usuario, setUsuario] = useState({ ...(!usuarioEdit?.id ? {nome: '', grupoId: 0} : {usuarioEdit}) , senha: ''})
  const [error, setError] = useState('');
  const [errorFetch, setErrorFetch] = useState('');

  const setSenha = useCallback( (novaSenha) => {

    const usuarioUsuario = {...usuario}

    usuarioUsuario.senha = novaSenha

    setUsuario(usuarioUsuario)
  }

  , [setUsuario, usuario])

  const setNome = useCallback( (novoNome) => {

    const usuarioUsuario = {...usuario}

    usuarioUsuario.nome = novoNome

    setUsuario(usuarioUsuario)
  }

  , [setUsuario, usuario])

  const setGrupo = useCallback( (novoGrupo) => {

    const usuarioUsuario = {...usuario}

    usuarioUsuario.grupoId = novoGrupo

    setUsuario(usuarioUsuario)
  }

  , [setUsuario, usuario])

  const handleSubmit = useCallback( async (e) => {

    e.preventDefault();
    setError('');

    function validarUsuario({nome, senha}){
      if(!nome || nome.length < 6) {
        throw new Error('nome precisa ter mais que 6 caracteres')
      }
      if(senha && senha.length < 6) {
        throw new Error('senha precisa ter mais que 6 caracteres')
      }
    }

    try {

      const usuarioEditado = {
        nome: usuario.nome,
        senha: usuario.senha,
        grupoId: Number(usuario.grupoId) === 0 ? null : Number(usuario.grupoId)
      }

      validarUsuario(usuario)

      const response = await axios.put(`/usuario/${usuario.id}`, {...usuarioEditado})

      const novoUsuario = response.data.usuario

      if (novoUsuario){
        history.push('/', {novoUsuario})
        history.go(0)
      }

    } catch (err) {
      let message;
      message = getErrorMessage(err)
      setError( message || 'Falha ao criar usuario')
    }

  }, [usuario])

  useEffect(()=>{
    async function fetchUsuario(){
      try {
        const res = await axios.get(`/usuario/${usuarioIdParams}`)
        if(!res.data.usuario?.id){
          throw new Error('usuario nao encontrado')
        }
        const usuarioFetch = {...res.data.usuario, senha: ''}
        setUsuarioEdit(usuarioFetch)
        setUsuario(usuarioFetch)
      } catch (error) {
        console.log(error)
        const message = getErrorMessage(error)
        setErrorFetch(message)
      }

    }
    if(!state?.usuarioEdit){
      fetchUsuario()
    }
  }, [errorFetch, error])

  return (
    <Container>
      { error && <p>{error}</p> }
      { errorFetch && <p>{errorFetch}</p> }
      {
        !errorFetch &&
        <div>
          <h1 style={{margin: `8px`}}>{usuarioEdit.nome}</h1>
          <MyForm onSubmit={handleSubmit}>
            <MyInput
              labelName="Nome"
              type="text"
              name="nome"
              id="nome"
              placeholder='Nome do usuario'
              value={usuario.nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <MyInput
              labelName="Nova Senha"
              type="password"
              name="senha"
              id="senha"
              placeholder='Senha do usuario'
              autoComplete='off'
              value={usuario.senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <MyInput
              labelName="Grupo"
              type="number"
              name="grupo"
              id="grupo"
              placeholder='Grupo do usuario'
              value={usuario.grupoId}
              onChange={(e) => setGrupo(e.target.value)}
            />
            <MyButton type="submit">Salvar</MyButton>
          </MyForm>
        </div>
      }
    </Container>
  );
}
