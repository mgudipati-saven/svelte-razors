import axios from 'axios'
import url from './URL'
import setupUser from './setupUser'

async function registerUser({ email, password, username }) {
  const res = await axios
    .post(`${url}/auth/local/register`, {
      username,
      email,
      password,
    })
    .catch((err) => console.log(err))

  if (res) {
    setupUser(res)
  }

  return res
}

export default registerUser
