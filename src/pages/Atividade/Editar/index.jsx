import React, { useCallback, useEffect, useState } from 'react';
import getErrorMessage from '../../../utils/getErrorMessage';
import axios from '../../../services/axios';
import history from '../../../services/history';

import MyInput from '../../../components/MyInput';
import MyForm from '../../../components/MyForm';


import {Container} from './styled'
import MyButton from '../../../components/MyButton';
import { useLocation, useParams } from 'react-router-dom';

export default function AtividadeEdit() {
  // const [name, setName] = useState(activity?.name || '');
  // const [status, setStatus] = useState(activity?.status || 'PENDENTE');
  // const [artifacts, setArtifacts] = useState(activity?.artifacts || []);

  // const addArtifact = () => {
  //   setArtifacts([...artifacts, { id: '', description: '' }]);
  // };

  // const updateArtifact = (index, field, value) => {
  //   const newArtifacts = [...artifacts];
  //   newArtifacts[index][field] = value;
  //   setArtifacts(newArtifacts);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSave({ ...activity, name, status, artifacts });
  // };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div>
  //       <label>Activity Name:</label>
  //       <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  //     </div>
  //     <div>
  //       <label>Status:</label>
  //       <select value={status} onChange={(e) => setStatus(e.target.value)}>
  //         <option value="PENDENTE">PENDENTE</option>
  //         <option value="ANDAMENTO">ANDAMENTO</option>
  //         <option value="TESTANDO">TESTANDO</option>
  //         <option value="PRONTO">PRONTO</option>
  //       </select>
  //     </div>
  //     <div>
  //       <h4>Artifacts</h4>
  //       {artifacts.map((artifact, index) => (
  //         <div key={index}>
  //           <input
  //             type="text"
  //             placeholder="ID"
  //             value={artifact.id}
  //             onChange={(e) => updateArtifact(index, 'id', e.target.value)}
  //           />
  //           <input
  //             type="text"
  //             placeholder="Description"
  //             value={artifact.description}
  //             onChange={(e) => updateArtifact(index, 'description', e.target.value)}
  //           />
  //         </div>
  //       ))}
  //       <button type="button" onClick={addArtifact}>Add Artifact</button>
  //     </div>
  //     <button type="submit">Save</button>
  //   </form>
  // );

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
        console.log('fetchUsuario')
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