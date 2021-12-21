const A_MINUTE_IN_MILLISECONDS = 60 * 1000

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const toDateStr = (date: Date): string => {
  const offset = date.getTimezoneOffset()
  const time = date.getTime()

  const utc = new Date(time - offset * A_MINUTE_IN_MILLISECONDS)
  return utc.toISOString().split('T')[0] // YYYY-MM-DD
}

const dateFromStr = (dateStr: String): Date => {
  const split = dateStr.split('-').map((str) => parseInt(str))
  return new Date(split[0], split[1] - 1, split[2])
}

const nowDateStr = (): string => {
  return toDateStr(new Date())
}

export { groupBy, toDateStr, nowDateStr, dateFromStr }
