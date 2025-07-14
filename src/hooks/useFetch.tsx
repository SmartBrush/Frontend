// src/hooks/useFetch.ts
import { useState, useEffect } from 'react'
import axios from 'axios'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get<T>(url)
      .then((res) => setData(res.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
