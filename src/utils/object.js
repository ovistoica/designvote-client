function toCamel(string) {
  return string.replace(/([-_][a-z])/gi, $1 =>
    $1.toUpperCase().replace('-', '').replace('_', ''),
  )
}

const isObject = args =>
  args === Object(args) && !Array.isArray(args) && typeof args !== 'function'

export function keysToCamel(args) {
  if (isObject(args)) {
    const n = {}

    Object.keys(args).forEach(k => {
      n[toCamel(k)] = keysToCamel(args[k])
    })

    return n
  }
  if (Array.isArray(args)) {
    return args.map(i => keysToCamel(i))
  }

  return args
}
