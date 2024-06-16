import getErrorMessage from "../utils/getErrorMessage"
import axios from "./axios"

class Acessos{

  static async getAcessos(grupoId){
    try {

      const response = await axios.get(`/grupo/${grupoId}/acessos`)

      const { acesso } = response.data


      return acesso

    } catch (error) {
      const message = getErrorMessage(error)
      console.log( 'getacesso', message)
      return Acessos.getDefaultAcesso()
    }
  }

  static getDefaultAcesso(){
    const defaultAcesso = {
      registrarUsuario: false
    }

    return defaultAcesso
  }

  static async getAcessosPage(grupoId, path){

    if(!grupoId) return false

    const acessos = await Acessos.getAcessos(grupoId)

    const acesso= acessos.find((acesso) => acesso.path === path)


    if(!acesso) return false

    return acesso.hasAccess
  }

}

export default Acessos
