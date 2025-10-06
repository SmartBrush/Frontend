// import { useEffect, useState } from 'react'
// import type { Category, Product } from '../../apis/products'
// import { fetchProducts, fetchProductsByCategory } from '../../apis/products'

// type Props = {
//   category: Category | 'all'
//   onSelect: (id: number | string) => void | Promise<void>
// }

// const toExternalUrl = (raw: string): string | null => {
//   const s = raw.trim()
//   const withProto = /^https?:\/\//i.test(s) ? s : `https://${s}`
//   try {
//     const u = new URL(withProto)
//     return u.toString()
//   } catch {
//     return null
//   }
// }

// const ProductList = ({ category, onSelect }: Props) => {
//   const [items, setItems] = useState<Product[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     let mounted = true
//     setLoading(true)
//     setError(null)
//     ;(async () => {
//       try {
//         const data =
//           category === 'all'
//             ? await fetchProducts(20)
//             : await fetchProductsByCategory(category, 20)
//         if (!mounted) return
//         setItems(data)
//       } catch {
//         if (!mounted) return
//         setItems([])
//         setError('상품을 가져오는 중 오류가 발생했어요. 콘솔을 확인해주세요.')
//       } finally {
//         if (mounted) setLoading(false)
//       }
//     })()
//     return () => {
//       mounted = false
//     }
//   }, [category])

//   if (loading)
//     return <div className="p-2 text-sm text-gray-500">불러오는 중…</div>
//   if (error) return <div className="p-2 text-sm text-red-600">{error}</div>
//   if (!items.length)
//     return <div className="p-2 text-sm text-gray-500">상품이 없어요</div>

//   return (
//     <ul className="grid grid-cols-2 gap-4">
//       {items.map((p) => {
//         const externalUrl = toExternalUrl(p.link)

//         return (
//           <li
//             key={p.id}
//             tabIndex={0}
//             className={[
//               'group rounded-xl p-2 cursor-pointer bg-[#F5F5F5] shadow-md',
//               'motion-safe:transition-all motion-safe:duration-200',
//               'hover:shadow-lg hover:-translate-y-0.5',
//               'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E9366]/40',
//             ].join(' ')}
//             onClick={() => onSelect(p.id)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' || e.key === ' ') onSelect(p.id)
//             }}
//           >
//             <img
//               src={p.image}
//               alt={p.name}
//               className={[
//                 'w-full h-40 object-cover rounded-md',
//                 'motion-safe:transition-transform motion-safe:duration-200',
//                 'group-hover:scale-[1.02]',
//               ].join(' ')}
//               loading="lazy"
//             />

//             <div className="text-xs text-gray-500 mt-2">{p.brand}</div>
//             <div className="text-[14px] font-semibold line-clamp-2">
//               {p.name}
//             </div>

//             <div className="mt-2 flex items-center justify-between">
//               <div className="text-xs font-bold">
//                 {'\u20A9'}
//                 {p.price.toLocaleString()}
//               </div>

//               {externalUrl ? (
//                 <a
//                   href={externalUrl}
//                   target="_blank"
//                   rel="noopener noreferrer nofollow"
//                   onClick={(e) => e.stopPropagation()}
//                   className={[
//                     'inline-block px-3 py-1 rounded-full bg-[#4E9366] text-white text-[9px] shadow-sm',
//                     'motion-safe:transition-colors motion-safe:duration-200',
//                     'hover:bg-[#437e58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E9366]/40',
//                   ].join(' ')}
//                   aria-label="올리브영 상세 페이지로 이동"
//                 >
//                   구매하러가기
//                 </a>
//               ) : (
//                 <button
//                   type="button"
//                   disabled
//                   onClick={(e) => e.stopPropagation()}
//                   className="inline-block px-3 py-1 rounded-full bg-gray-300 text-white text-[11px] font-semibold shadow-sm cursor-not-allowed"
//                   title="외부 링크가 제공되지 않았습니다"
//                 >
//                   링크 없음
//                 </button>
//               )}
//             </div>
//           </li>
//         )
//       })}
//     </ul>
//   )
// }

// export default ProductList

import { useEffect, useState } from 'react'
import type { Category, Product } from '../../apis/products'
import { fetchProducts, fetchProductsByCategory } from '../../apis/products'

type Props = {
  category: Category | 'all'
  onSelect: (id: number | string) => void | Promise<void>
  size?: number // ★ 추가: 몇 개 가져올지
}

const toExternalUrl = (raw: string): string | null => {
  const s = raw.trim()
  const withProto = /^https?:\/\//i.test(s) ? s : `https://${s}`
  try {
    const u = new URL(withProto)
    return u.toString()
  } catch {
    return null
  }
}

const ProductList = ({ category, onSelect, size = 50 }: Props) => {
  // ★ 기본 50
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
            ? await fetchProducts(size) // ★ 20 → size
            : await fetchProductsByCategory(category, size) // ★ 20 → size
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
  }, [category, size]) // ★ size 의존성 추가

  if (loading)
    return <div className="p-2 text-sm text-gray-500">불러오는 중…</div>
  if (error) return <div className="p-2 text-sm text-red-600">{error}</div>
  if (!items.length)
    return <div className="p-2 text-sm text-gray-500">상품이 없어요</div>

  return (
    <ul className="grid grid-cols-2 gap-4">
      {items.map((p) => {
        const externalUrl = toExternalUrl(p.link)
        return (
          <li
            key={p.id}
            tabIndex={0}
            className={[
              'group rounded-xl p-2 cursor-pointer bg-[#F5F5F5] shadow-md',
              'motion-safe:transition-all motion-safe:duration-200',
              'hover:shadow-lg hover:-translate-y-0.5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E9366]/40',
            ].join(' ')}
            onClick={() => onSelect(p.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelect(p.id)
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              className={[
                'w-full h-40 object-cover rounded-md',
                'motion-safe:transition-transform motion-safe:duration-200',
                'group-hover:scale-[1.02]',
              ].join(' ')}
              loading="lazy"
            />
            <div className="text-xs text-gray-500 mt-2">{p.brand}</div>
            <div className="text-[14px] font-semibold line-clamp-2">
              {p.name}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-xs font-bold">
                {'\u20A9'}
                {p.price.toLocaleString()}
              </div>
              {externalUrl ? (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  onClick={(e) => e.stopPropagation()}
                  className={[
                    'inline-block px-3 py-1 rounded-full bg-[#4E9366] text-white text-[9px] shadow-sm',
                    'motion-safe:transition-colors motion-safe:duration-200',
                    'hover:bg-[#437e58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E9366]/40',
                  ].join(' ')}
                  aria-label="올리브영 상세 페이지로 이동"
                >
                  구매하러가기
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block px-3 py-1 rounded-full bg-gray-300 text-white text-[11px] font-semibold shadow-sm cursor-not-allowed"
                  title="외부 링크가 제공되지 않았습니다"
                >
                  링크 없음
                </button>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ProductList
