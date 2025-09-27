// // // 제품 아이템 단위 컴포넌트
// import LinkButton from '../ProductDetail/LinkButton'
// import type { Product } from '../../apis/products'

// interface ProductListItemProps {
//   product: Product
//   onClick: () => void
// }

// // 안전한 문자열 체크
// const isNonEmptyString = (v: unknown): v is string =>
//   typeof v === 'string' && v.trim().length > 0

// // 다양한 키 후보에서 브랜드 추출 (brand/brandName/manufacturer 등)
// const getBrand = (p: Product): string | null => {
//   const rec = p as unknown as Record<string, unknown>
//   const keys = [
//     'brand',
//     'brandName',
//     'manufacturer',
//     'maker',
//     'company',
//   ] as const
//   for (const k of keys) {
//     const v = rec[k]
//     if (isNonEmptyString(v)) return v
//   }
//   return null
// }

// const ProductListItem = ({ product, onClick }: ProductListItemProps) => {
//   const brand = getBrand(product)

//   return (
//     <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm overflow-hidden">
//       {/* 이미지: 비율 고정 */}
//       <button onClick={onClick} className="w-full">
//         <div className="relative w-full aspect-[4/5] overflow-hidden">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="absolute inset-0 w-full h-full object-cover"
//             loading="lazy"
//           />
//         </div>
//       </button>

//       {/* 내용 영역 */}
//       <div className="flex flex-col p-3">
//         {brand && (
//           <span className="mt-1 text-[11px] font-semibold text-gray-500 self-start">
//             {brand}
//           </span>
//         )}

//         {/* 제목: 두 줄 고정 높이로 카드 높이 균일화 */}
//         <h4 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[3.1em]">
//           {product.name}
//         </h4>

//         {/* 하단 바: 항상 맨 아래에 고정 */}
//         <div className="mt-auto flex justify-between items-center">
//           <span className="text-sm font-semibold text-gray-900 mt-1.5">
//             ₩{product.price.toLocaleString()}
//           </span>
//           <div className="shrink-0">
//             <LinkButton product={product} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductListItem
