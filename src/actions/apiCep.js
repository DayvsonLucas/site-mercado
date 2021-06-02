import axios from 'axios'

export const ApiCep = async (cep) => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    return response
}
