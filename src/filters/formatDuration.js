import parseDuration from '@/utils/parseDuration'
export default function formatDuration (value) {
  const date = parseDuration(value)
  let hours = `${date.hours}:`
  let minutes = `${date.minutes}:`
  let seconds = `${date.seconds}`
  if (date.hours < 10) {
    hours = '0' + date.hours + ':'
  }
  if (date.hours === 0) {
    hours = ''
  }
  if (date.minutes < 10) {
    minutes = '0' + date.minutes + ':'
  }
  if (date.seconds < 10) {
    seconds = '0' + date.seconds
  }
  return `${hours}${minutes}${seconds}`
}
