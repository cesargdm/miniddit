import ky from 'ky'

const BASE_URL = 'https://www.reddit.com'

function getAllPosts() {
  return ky(`${BASE_URL}/r/all.json`).json()
}

function getRedditComments({ category, user, slug }) {
  return ky(`${BASE_URL}/r/${category}/comments/${user}/${slug}.json`).json()
}

export { getRedditComments, getAllPosts }
