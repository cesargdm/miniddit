function upsFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num)
}

function getLongAgo(fromDate) {
  // get total seconds between the times
  const now = Date.now() / 1000

  let delta = Math.abs(now - fromDate)

  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400)
  delta -= days * 86400

  if (days) return `${days} days ago `

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  if (hours) return `${hours} hours ago`

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  if (minutes) return `${minutes} minutes ago`

  const seconds = Math.floor(delta % 60)
  // what's left is seconds
  if (seconds) return `${seconds} seconds ago`

  return 'Just now'
}

function setScoreByStatus({ score, prevStatus, status, value }) {
  if (!prevStatus) return score + value
  if (prevStatus === status) return score - value
  if (prevStatus !== status) return score + value * 2
  return score
}

export { setScoreByStatus, getLongAgo, upsFormatter }
