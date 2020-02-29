import { useState, useEffect } from 'react'

import ky from 'ky'

function useRequest(url) {
  const [{ data, loading, error }, setResponse] = useState({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    async function getAll() {
      try {
        const response = await ky(url).json()

        setResponse({ data: response, loading: false, error: false })
      } catch (error) {
        console.warn(error)
        setResponse({ data: null, loading: false, error })
      }
    }

    getAll()
  }, [url])

  return { data, loading, error }
}

export default useRequest
