// 내 두피에 맞는 제품 리스트
import ProductListItem from './ProductListItem'
import { useFetch } from '../../hooks/useFetch'
import type { Product } from '../../apis/products'

interface Props {
  category: string
  onSelect: (id: string) => void
}

const ProductList = ({ category, onSelect }: Props) => {
  const url =
    category === 'all'
      ? `${import.meta.env.VITE_API_BASE_URL}/api/products`
      : `${import.meta.env.VITE_API_BASE_URL}/api/products/${category}`

  const { data: products, loading, error } = useFetch<Product[]>(url)

  if (loading) return <div>로딩 중...</div>
  if (error || !products) return <div>에러가 발생했습니다.</div>

  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((item) => (
        <ProductListItem
          key={item.id}
          product={item}
          onClick={() => onSelect(String(item.id))}
        />
      ))}
    </div>
  )
}

export default ProductList
