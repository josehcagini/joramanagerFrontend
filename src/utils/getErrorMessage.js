import { AxiosError } from "axios";

function getErrorMessage(error){
  console.log(`GetErrorMessage`, error)
  const message = error instanceof AxiosError ? error.response.data.error.message : error.message
  return message
}

export default getErrorMessage;
