function toCamel(str: string) {
  return str.replace(/([-_][a-z])/gi, $1 =>
    $1.toUpperCase().replace('-', '').replace('_', ''),
  )
}

const isObject = (args: unknown): args is Record<string | number, unknown> =>
  args === Object(args) && !Array.isArray(args) && typeof args !== 'function'

export function keysToCamel<SnakeObj = unknown, CamelObj = unknown>(
  args: SnakeObj,
): CamelObj {
  if (isObject(args)) {
    const n: Record<string, unknown> = {}

    Object.keys(args).forEach(k => {
      n[toCamel(k)] = keysToCamel(args[k])
    })

    return n as CamelObj
  }
  if (Array.isArray(args)) {
    return args.map(i => keysToCamel(i)) as any
  }

  return args as any
}

export function filterNullValues<T = unknown>(obj: Record<string, T>) {
  const keys = Object.keys(obj)
  const finalObject: Record<string, T> = {}

  keys.forEach(k => {
    if (obj[k] !== null || obj[k] !== undefined) {
      finalObject[k] = obj[k]
    }
  })
  return finalObject
}
