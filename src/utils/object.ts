function toCamel(str: string) {
  return str.replace(/([-_][a-z])/gi, $1 =>
    $1.toUpperCase().replace('-', '').replace('_', ''),
  )
}

const isObject = (args: unknown): args is Record<string | number, unknown> => {
  return (
    args === Object(args) && !Array.isArray(args) && typeof args !== 'function'
  )
}

export function keysToCamel<SnakeObj = unknown, CamelObj = unknown>(
  args: SnakeObj,
): CamelObj {
  if (isObject(args)) {
    let n: Record<string, unknown> = {}

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
