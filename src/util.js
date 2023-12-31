export async function getPath(path) {
  try {
    console.log(`Making GET request to ${API_ACCESS_POINT}${path}`)
    const res = await fetch(`${API_ACCESS_POINT}${path}`)
    const data = await res.json()
    return data
  } catch (err) {
    throw err
  }
}

export async function postPath(path, reqbody) {
  try {
    console.log(`Making POST request to ${API_ACCESS_POINT}${path}`)
    const res = await fetch(`${API_ACCESS_POINT}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqbody),
    })
    const data = await res.json()
    return data
  } catch (err) {
    throw err
  }
}

export async function patchPath(path, reqbody) {
  try {
    console.log(`Making PATCH request to ${API_ACCESS_POINT}${path}`)
    const res = await fetch(`${API_ACCESS_POINT}${path}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqbody),
    })
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

// debounce function provided by freecodecamp author 'Ondrej Polesny'
// https://www.freecodecamp.org/news/javascript-debounce-example/
export function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(null, args)
    }, timeout)
  }
}
