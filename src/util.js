export function wrapPromise(promise) {
  let status = 'pending'
  let response

  const suspender = promise.then(
    (res) => {
      status = 'success'
      response = res
    },
    (err) => {
      status = 'error'
      response = err
    },
  )

  const handler = {
    pending: () => {
      throw suspender
    },
    error: () => {
      throw response
    },
    default: () => response,
  }

  const read = () => {
    const result = handler[status] ? handler[status]() : handler.default()
    return result
  }

  return { read }
}

export async function getPath(path) {
  const res = await fetch('http://localhost:3000' + path)
  const data = await res.json()
  return data
}

export function wrappedGetPath(path) {
  return wrapPromise(getPath(path))
}
