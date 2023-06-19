import axios from "axios"

export const getContacts = async () => {
    const { data } = await axios.get('https://648f851175a96b6644453225.mockapi.io/contacts')
    return data
}