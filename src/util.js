export async function getPath(path) {
  try {
    console.log(`Making request to http://localhost:3000${path}`)
    console.log(location.hostname)
    const res = await fetch(`http://${location.hostname}:3000${path}`)
    const data = await res.json()
    return data
  } catch (err) {
    throw err
  }
}
