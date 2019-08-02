import { Message } from 'element-ui'

export default function ({ $axios, redirect }) {
  $axios.onError(err => {
    const { stautsCode, message } = err.response.data
    if (stautsCode === 400) {
      Message.warning({ message })
    }
  })
}