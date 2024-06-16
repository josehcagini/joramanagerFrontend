import React, { useCallback, useEffect, useState} from 'react';
import axios from '../../../services/axios';

import AtividadeCard from '../../../components/AtividadeCard';
import { Container } from './styled'

import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import MyButton from "../../../components/MyButton"
import history from "../../../services/history"

const AtividadeList = () => {
  const [atividades, SetAtividades] = useState([])

  useEffect(() => {
    async function getAtividades(){
      const response = await axios.get('/atividade')

      const atividadesRes = response.data.atividades

      SetAtividades(atividadesRes)
    }
    try {
      getAtividades()
    } catch (error) {
      console.log(error)
    }


  }, [])

  const handleDeletar = useCallback(async (e, atividade) => {
    e.preventDefault()

    try {
      const response = await axios.delete(`/atividade/${atividade.id}`)

      console.log('handleDeletar')
      console.log(response)

      const indexAtividadeDelete = atividades.indexOf(atividade)
      const novasAtividades = [...atividades]

      novasAtividades.splice(indexAtividadeDelete, 1)
      SetAtividades(novasAtividades)
    } catch (err) {
      console.log(err)
    }


  }, [SetAtividades, atividades])

  const handleEditar = useCallback(async (e, atividade) => {
    e.preventDefault()

    history.push(`/atividade/${atividade.id}/editar`, {atividadeEdit: atividade})
    history.go(0)

  }, [])

  return(
    <Container>
    <h1>Atividades</h1>

    <Link to={'/atividade/registrar'} >
      <MyButton>
          <span style={{marginRight: '5px'}}>Criar</span>
          <FaPlus />
      </MyButton>
    </Link>

    {
      atividades.map(function(atividade) {
          return (
            <AtividadeCard
              key={atividade.id}
              atividade={atividade}
              handleDeletar={(e) => handleDeletar(e, atividade)}
              handleEditar={(e) => handleEditar(e, atividade)}
            />
          )
        }
      )
    }
    </Container>
  )
};

export default AtividadeList;