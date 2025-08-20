import API from './api'

/** 실제 화면에서 사용할 타입(통일된 형태) */
export interface Product {
  id: number
  name: string
  category: string
  brand: string
  price: number
  image: string
  link: string
}

/** 서버 원본이 문자열일 수도 있으니 Raw 타입 분리 */
type ProductRaw = {
  id: number | string
  name: string
  brand: string
  category: string
  price: number | string // swagger는 string으로 표기됨
  image: string
  link: string
}

/** 원본 → 화면용 정규화 */
const normalize = (p: ProductRaw): Product => ({
  id: Number(p.id),
  name: p.name,
  brand: p.brand,
  category: p.category,
  // "13,000", "₩13000" 같은 문자열도 숫자로 변환
  price:
    typeof p.price === 'number'
      ? p.price
      : Number(String(p.price).replace(/[^\d.]/g, '')),
  image: p.image,
  link: p.link,
})

/** 전체 상품 */
export async function fetchProducts(): Promise<Product[]> {
  const { data } = await API.get<ProductRaw[]>('/api/products')
  return data.map(normalize)
}

/** 카테고리별 (all이면 전체) */
export async function fetchProductsByCategory(
  category: string,
): Promise<Product[]> {
  const path =
    category === 'all' ? '/api/products' : `/api/products/${category}`
  const { data } = await API.get<ProductRaw[]>(path)
  return data.map(normalize)
}

/** 단일 상품 조회
 *  상세 API가 없다면 전체 받아서 필터링(현재 방식)
 *  상세 API가 있으면 아래 주석처럼 교체 권장
 */
export async function fetchProductById(id: string | number): Promise<Product> {
  // ✅ 상세 API가 있다면 이걸로 교체:
  // const { data } = await API.get<ProductRaw>(`/api/product/${id}`)
  // return normalize(data)

  const { data: all } = await API.get<ProductRaw[]>('/api/products')
  const targetId = Number(id)
  const raw = all.find((p) => Number(p.id) === targetId)
  if (!raw) throw new Error('Not Found')
  return normalize(raw)
}

export async function getWishlist() {
  const { data } = await API.get('/api/wishlist', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
  return data as Array<{ id: number } | { id: string }> // 최소 id만 쓰면 충분
}

/** 특정 상품이 찜되어 있는지 여부 */
export async function isWishlisted(productId: number): Promise<boolean> {
  const list = await getWishlist()
  const pid = Number(productId)
  type WithId = { id: number | string }
  return list.some((it: WithId) => Number(it.id) === pid)
}

/** 찜하기 */
export async function addWishlist(productId: number): Promise<void> {
  await API.post(`/api/wishlist/${productId}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

/** 찜 해제 */
export async function removeWishlist(productId: number): Promise<void> {
  await API.delete(`/api/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
