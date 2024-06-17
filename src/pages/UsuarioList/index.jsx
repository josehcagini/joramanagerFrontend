import React, { useCallback, useEffect, useState } from "react"
import axios from "../../services/axios"

import UsuarioCard from "../../components/UsuarioCard"
import { Container } from "./styled"

import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import MyButton from "../../components/MyButton"
import history from "../../services/history"

export default function UsuarioList(){

  const [usuarios, SetUsuarios] = useState([])

  useEffect(() => {
    async function getUsuarios(){
      const response = await axios.get('/usuario')
      console.log(response.data)
      const usuariosRes = response.data.usuarios

      SetUsuarios(usuariosRes)
    }
    try {
      getUsuarios()
    } catch (error) {
      console.log(error)
    }


  }, [])

  const handleDeletar = useCallback(async (e, usuario) => {
    e.preventDefault()

    try {
      const response = await axios.delete(`/usuario/${usuario.id}`)

      console.log('handleDeletar')
      console.log(response)

      const indexUsuarioDelete = usuarios.indexOf(usuario)
      const novoUsuarios = [...usuarios]

      novoUsuarios.splice(indexUsuarioDelete, 1)
      SetUsuarios(novoUsuarios)
    } catch (err) {
      console.log(err)
    }


  }, [SetUsuarios, usuarios])

  const handleEditar = useCallback(async (e, usuario) => {
    e.preventDefault()

    history.push(`/usuario/${usuario.id}/editar`, {usuarioEdit: usuario})
    history.go(0)

  }, [])

  return(
    <Container>
    <h1>Usuarios</h1>

    <Link to={'/usuario/registrar'} >
      <MyButton>
          <span style={{marginRight: '5px'}}>Criar</span>
          <FaPlus />
      </MyButton>
    </Link>

    {
      usuarios.map(function(usuario) {
          return (
            <UsuarioCard
              key={usuario.id}
              usuario={usuario}
              handleDeletar={(e) => handleDeletar(e, usuario)}
              handleEditar={(e) => handleEditar(e, usuario)}
            />
          )
        }
      )
    }
    </Container>
  )
}
