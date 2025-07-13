import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import type { Product } from '../../types/Product'

const LinkButton = () => {
  const { id } = useParams<{ id: string }>()
  const { data: products, loading } = useFetch<Product[]>(
    `${import.meta.env.VITE_API_BASE_URL}/products`,
  )

  const index = Number(id) - 1
  const product = Array.isArray(products) ? products[index] : undefined

  if (loading || !product) return null

  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full py-[12px] bg-blue-100 text-blue-700 font-bold rounded-lg text-center hover:bg-blue-200 transition "
    >
      올리브영으로 제품 사러가기
    </a>
  )
}

export default LinkButton
