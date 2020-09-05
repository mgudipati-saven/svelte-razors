import axios from 'axios'
import url from './URL'

async function submitOrder({ name, total, items, stripeToken, userToken }) {
  const res = await axios
    .post(
      `${url}/orders`,
      {
        name,
        total,
        items,
        stripeToken,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )
    .catch((err) => console.log(err))

  return res
}

export default submitOrder
