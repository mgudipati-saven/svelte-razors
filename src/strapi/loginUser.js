import axios from 'axios'
import url from './URL'
import setupUser from './setupUser'

async function loginUser({ email, password }) {
  const res = await axios
    .post(`${url}/auth/local`, {
      identifier: email,
      password,
    })
    .catch((err) => console.log(err))

  if (res) {
    setupUser(res)
  }

  return res
}

export default loginUser
