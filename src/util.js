export async function getPath(path) {
  try {
    console.log(`Making request to http://localhost:3000${path}`)
    const res = await fetch(`http://${location.hostname}:3000${path}`)
    const data = await res.json()
    return data
  } catch (err) {
    throw err
  }
}

// This slugify function is due to github user 'codeguy'
// https://gist.github.com/codeguy/6684588
export function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  var to = 'aaaaeeeeiiiioooouuuunc------'
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
}
