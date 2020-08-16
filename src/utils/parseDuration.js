/**
 * Parse ISO 8601 duration (with a few limitations)
 *
 * @example
 * let aDayAgo = parseDuration('-P1D').add, yesterday = aDayAgo(new Date());
 *
 * @param {String} duration: ISO 8601 duration, only in "PnYnMnDTnHnMnS" or "PnW" formats, n being an integer
 * @throws {Error} When duration cannot be parsed
 * @returns {Object} Parsed duration with "add" method that sums or substracts parsed duration to a given date, accorging duration sign
 */
// see https://en.wikipedia.org/wiki/ISO_8601#Durations
const durationRegex = /^(-)?P(?:(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?|(\d+)W)$/
export default function parseDuration (duration) {
  let parsed
  duration &&
    duration.replace(durationRegex, (_, sign, ...units) => {
      sign = sign ? -1 : 1
      // parse number for each unit
      const [years, months, days, hours, minutes, seconds, weeks] = units.map(
        num => parseInt(num, 10) * sign || 0
      )
      parsed = { years, months, weeks, days, hours, minutes, seconds }
    })
  // no regexp match
  if (!parsed) {
    throw new Error(`Invalid duration "${duration}"`)
  }

  return Object.assign(parsed, {
    /**
     * Sum or substract parsed duration to date
     *
     * @param {Date} date: Any valid date
     * @throws {TypeError} When date is not valid
     * @returns {Date} New date with duration difference
     */
    add (date) {
      if (
        Object.prototype.toString.call(date) !== '[object Date]' ||
        isNaN(date.valueOf())
      ) {
        throw new TypeError('Invalide date')
      }
      return new Date(
        Date.UTC(
          date.getUTCFullYear() + parsed.years,
          date.getUTCMonth() + parsed.months,
          date.getUTCDate() + parsed.days + parsed.weeks * 7,
          date.getUTCHours() + parsed.hours,
          date.getUTCMinutes() + parsed.minutes,
          date.getUTCSeconds() + parsed.seconds,
          date.getUTCMilliseconds()
        )
      )
    }
  })
}
