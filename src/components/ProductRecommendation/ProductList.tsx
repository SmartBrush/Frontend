import { useEffect, useState } from 'react'
import type { Category, Product } from '../../apis/products'
import { fetchProducts, fetchProductsByCategory } from '../../apis/products'

type Props = {
  category: Category | 'all'
  onSelect: (id: number | string) => void | Promise<void>
}

export default function ProductList({ category, onSelect }: Props) {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    ;(async () => {
      try {
        const data =
          category === 'all'
            ? await fetchProducts(20)
            : await fetchProductsByCategory(category, 20)
        if (!mounted) return
        setItems(data)
      } catch {
        if (!mounted) return
        setItems([])
        setError('상품을 가져오는 중 오류가 발생했어요. 콘솔을 확인해주세요.')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [category])

  if (loading)
    return <div className="p-2 text-sm text-gray-500">불러오는 중…</div>
  if (error) return <div className="p-2 text-sm text-red-600">{error}</div>
  if (!items.length)
    return <div className="p-2 text-sm text-gray-500">상품이 없어요</div>

  return (
    <ul className="grid grid-cols-2 gap-4">
      {items.map((p) => (
        <li
          key={p.id}
          className="rounded-xl p-2 cursor-pointer bg-[#F5F5F5] shadow-md"
          onClick={() => onSelect(p.id)}
        >
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-28 object-cover rounded-md"
          />
          <div className="text-xs text-gray-500 mt-2">{p.brand}</div>
          <div className="text-[14px] font-semibold">{p.name}</div>
          <div className="text-sm font-bold mt-1">
            {'\u20A9'}
            {p.price.toLocaleString()}원
          </div>
        </li>
      ))}
    </ul>
  )
}
