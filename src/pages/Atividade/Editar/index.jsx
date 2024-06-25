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
  const localtionPath = useLocation()
  const state = localtionPath?.state  || {}
  const params = useParams()
  const atividadeIdParams = params.atividadeId

  const [atividadeEdit, setAtividadeEdit] = useState( {...(state?.atividadeEdit || {})} )

  const [atividade, setAtividade] = useState({ ...(!atividadeEdit?.id ? {titulo: '', descricao: '', status: 0, dtentrega: new Date().toISOString().slice(0, 16), usuario_id:1} : {atividadeEdit})})
  const [error, setError] = useState('');
  const [errorFetch, setErrorFetch] = useState('');

  const [artefatos, setArtefatos] = useState([]);

  const addArtefato = () => {
    setArtefatos([...artefatos, { titulo: '', descricao: '', originalname: '', filename: '', url: '' }]);
  };

  const updateArtefato = (index, field, value) => {
    const newArtefatos = [...artefatos];
    newArtefatos[index][field] = value;
    setArtefatos(newArtefatos);
  };

  const deleteArtefato = (index) => {
    const newArtefatos = artefatos.filter((_, i) => i !== index);
    setArtefatos(newArtefatos);
  };

  const setTitulo = useCallback( (novaTitulo) => {
    const atividadeAtividade = {...atividade}

    atividadeAtividade.titulo = novaTitulo

    setAtividade(atividadeAtividade)
  }, [setAtividade, atividade])

  const setDescricao = useCallback( (novoDescricao) => {
    const atividadeAtividade = {...atividade}

    atividadeAtividade.descricao = novoDescricao

    setAtividade(atividadeAtividade)
  }, [setAtividade, atividade])

  const setStatus = useCallback( (novoStatus) => {
    const atividadeAtividade = {...atividade}

    atividadeAtividade.status = novoStatus

    setAtividade(atividadeAtividade)
  }, [setAtividade, atividade])

  const setDtentrega = useCallback( (novoDtEntrega) => {
    const atividadeAtividade = {...atividade}

    atividadeAtividade.dtentrega = novoDtEntrega

    setAtividade(atividadeAtividade)
  }, [setAtividade, atividade])

  const setUsuarioId = useCallback( (novoUsuarioId) => {
    const atividadeAtividade = {...atividade}

    atividadeAtividade.usuario_id = novoUsuarioId

    setAtividade(atividadeAtividade)
  }, [setAtividade, atividade])

  const handleSubmit = useCallback( async (e) => {

    e.preventDefault();
    setError('');

    function validarAtividade({titulo, descricao, usuario_id}){
      if(!titulo) {
        throw new Error('Título não pode estar em branco')
      }
      if(!descricao) {
        throw new Error('Descrição não pode estar em branco')
      }
      if(!usuario_id) {
        throw new Error('É preciso informar um usuário')
      }
    }

    try {
      const atividadeEditado = {
        titulo: atividade.titulo,
        descricao: atividade.descricao,
        status: atividade.status,
        dtentrega: atividade.dtentrega,
        usuario_id: atividade.usuario_id
      }

      validarAtividade(atividade)

      const response = await axios.put(`/atividade/${atividade.id}`, {...atividadeEditado})

      const novoAtividade = response.data.atividade

      if (novoAtividade){
        history.push('/', {novoAtividade})
        history.go(0)
      }

    } catch (err) {
      let message;
      message = getErrorMessage(err)
      setError( message || 'Falha ao criar atividade')
    }

  }, [atividade])

  useEffect(()=>{
    async function fetchAtividade(){
      try {
        const res = await axios.get(`/atividade/${atividadeIdParams}`)
        if(!res.data.atividade?.id){
          throw new Error('atividade nao encontrado')
        }
        const atividadeFetch = {...res.data.atividade}
        setAtividadeEdit(atividadeFetch)
        setAtividade(atividadeFetch)
      } catch (error) {
        console.log('fetchAtividade')
        console.log(error)
        const message = getErrorMessage(error)
        setErrorFetch(message)
      }

    }
    if(!state?.atividadeEdit){
      fetchAtividade()
    }
  }, [errorFetch, error])

  return (
    <Container>
      { error && <p>{error}</p> }
      { errorFetch && <p>{errorFetch}</p> }
      {
        !errorFetch &&
        <div>
          <h1 style={{margin: `8px`}}>Atividade</h1>
          <MyForm onSubmit={handleSubmit}>
            <MyInput
              labelName="Título"
              type="text"
              name="titulo"
              id="titulo"
              placeholder='Título da atividade'
              value={atividade.titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <label style={{display:'flex',alignItems:'center'}}>
              Descrição
              <textarea rows={6} name="descricao" placeholder='Descrição da atividade' value={atividade.descricao} onChange={(e) => setDescricao(e.target.value)} />
            </label>
            <div style={{paddingTop:5}}>
              <label style={{paddingRight:5}}>Status</label>
              <select value={atividade.status} onChange={(e) => setStatus(e.target.value)}>
                <option value="0">Pendente</option>
                <option value="1">Andamento</option>
                <option value="2">Testando</option>
                <option value="3">Pronto</option>
              </select>
            </div>
            <MyInput
              labelName="Data"
              type="datetime-local"
              name="dtentrega"
              id="dtentrega"
              value={atividade.dtentrega}
              onChange={(e) => setDtentrega(e.target.value)}
            />
            <div>
              <label style={{paddingRight:5}}>Usuário</label>
              <select value={atividade.usuario_id} onChange={(e) => setUsuarioId(e.target.value)}>
                <option value="1">admin</option>
                <option value="2">dev</option>
                <option value="3">teste</option>
              </select>
            </div>
            <Container>
              <h2 style={{margin: `8px`}}>Artefatos</h2>
              {artefatos.map((artefato, index) => (
                <div key={index} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <input
                    type="text"
                    placeholder="Título"
                    value={artefato.titulo}
                    onChange={(e) => updateArtefato(index, 'titulo', e.target.value)}
                  />
                  <input
                    style={{margin:0}}
                    type="text"
                    placeholder="Descrição"
                    value={artefato.descricao}
                    onChange={(e) => updateArtefato(index, 'descricao', e.target.value)}
                  />
                  <button style={{margin:5}} type="button" onClick={() => deleteArtefato(index)}>Excluir</button>
                </div>
              ))}
              <button style={{margin:5}} type="button" onClick={addArtefato}>Adicionar</button>
            </Container>
            <button type="submit">Salvar</button>
          </MyForm>
        </div>
      }
    </Container>
  );
}