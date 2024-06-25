import React, { useCallback, useState } from 'react';
import getErrorMessage from '../../../utils/getErrorMessage';
import axios from '../../../services/axios';
import history from '../../../services/history';


import MyInput from '../../../components/MyInput';
import MyForm from '../../../components/MyForm';


import {Container} from './styled'

export default function AtividadeCreate() {
  const [error, setError] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState(0);
  const [dtentrega, setDtentrega] = useState(new Date().toISOString().slice(0, 16));
  const [usuario_id, setUsuarioId] = useState(1);
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
      const atividade = {
        titulo,
        descricao,
        status,
        dtentrega,
        usuario_id
      }

      validarAtividade(atividade)

      const response = await axios.post('/atividade', {atividade})

      const novaAtividade = response.data.novaAtividade

      if (novaAtividade){
        history.push('/', {novaAtividade})
        history.go(0)
      }

    } catch (err) {
      let message;
      message = getErrorMessage(err)
      setError( message || 'Falha ao criar atividade')
    }

  }, [titulo, descricao, status, dtentrega, usuario_id])

  return (
    <Container>
      <h1 style={{margin: `8px`}}>Atividade</h1>
      {
        error &&
        <p>{error}</p>
      }
      <MyForm onSubmit={handleSubmit}>
        <MyInput
          labelName="Título"
          type="text"
          name="titulo"
          id="titulo"
          placeholder='Título da atividade'
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label style={{display:'flex',alignItems:'center'}}>
          Descrição
          <textarea rows={6} name="descricao" placeholder='Descrição da atividade' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </label>
        <div style={{paddingTop:5}}>
          <label style={{paddingRight:5}}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
          value={dtentrega}
          onChange={(e) => setDtentrega(e.target.value)}
        />
        <div>
          <label style={{paddingRight:5}}>Usuário</label>
          <select value={usuario_id} onChange={(e) => setUsuarioId(e.target.value)}>
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

    </Container>
  );
}