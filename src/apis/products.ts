import API from './api'
import axios, { isAxiosError, type AxiosInstance } from 'axios'

export type Category =
  | 'shampoo'
  | 'conditioner'
  | 'treatment'
  | 'tonic'
  | 'essence'

export interface Product {
  id: number
  name: string
  category: string
  brand: string
  price: number
  image: string
  link: string
}

type ProductRaw = {
  id: number | string
  name: string
  brand: string
  category: string
  price: number | string
  image: string
  link: string
}

type QueryParams =
  | Record<string, string | number | boolean | undefined>
  | undefined

const toNumber = (v: number | string): number =>
  typeof v === 'number' ? v : Number(String(v).replace(/[^\d.]/g, ''))

const normalize = (p: ProductRaw): Product => ({
  id: Number(p.id),
  name: p.name,
  brand: p.brand,
  category: p.category,
  price: toNumber(p.price),
  image: p.image,
  link: p.link,
})

// 슬래시 정리
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

// 전역 인터셉터 영향 없는 공개용 인스턴스
const publicAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
})

async function publicGet<T>(path: string, params?: QueryParams) {
  return publicAxios.get<T>(path, { params })
}

async function authedGet<T>(path: string, params?: QueryParams) {
  return API.get<T>(path, { params })
}

async function _getProducts(
  params: { category?: Category | 'all'; size?: number } = {},
): Promise<Product[]> {
  const { category, size = 50 } = params
  const path =
    category && category !== 'all'
      ? `/api/products/${category}`
      : '/api/products'

  // 1) 공개 호출
  try {
    const res = await publicGet<ProductRaw[]>(path, { size })
    const arr = Array.isArray(res.data) ? res.data : []
    // 비로그인 응답이 빈 배열이면 토큰으로 재시도
    if (arr.length > 0) return arr.map(normalize)
  } catch (e) {
    if (isAxiosError(e)) {
      // eslint-disable-next-line no-console
      console.debug(
        '[products] public fail:',
        e.response?.status,
        e.response?.data || e.message,
      )
      // 401/403/0(네트워크) 등은 아래에서 인증 호출로 전환
    } else {
      throw e
    }
  }

  // 2) 인증 호출 (토큰 필요 환경 대응)
  try {
    const { data } = await authedGet<ProductRaw[]>(path, { size })
    return Array.isArray(data) ? data.map(normalize) : []
  } catch (e) {
    if (isAxiosError(e)) {
      // eslint-disable-next-line no-console
      console.debug(
        '[products] authed fail:',
        e.response?.status,
        e.response?.data || e.message,
      )
    }
    throw e
  }
}

export async function fetchProducts(size = 50): Promise<Product[]> {
  return _getProducts({ size })
}

export async function fetchProductsByCategory(
  category: Category | 'all',
  size = 50,
): Promise<Product[]> {
  return _getProducts({ category, size })
}

export async function fetchProductById(id: string | number): Promise<Product> {
  const all = await fetchProducts(200)
  const targetId = Number(id)
  const found = all.find((p) => p.id === targetId)
  if (!found) throw new Error('Not Found')
  return found
}

/* 위시리스트/좋아요 API는 그대로 API 인스턴스 사용 (변경 없음) */
type WishlistItem = { id: number | string }
export async function getWishlist(): Promise<WishlistItem[]> {
  const { data } = await API.get<WishlistItem[]>('/api/wishlist')
  return Array.isArray(data) ? data : []
}
export async function isWishlisted(productId: number): Promise<boolean> {
  const list = await getWishlist()
  const pid = Number(productId)
  return list.some((it) => Number(it.id) === pid)
}
export async function addWishlist(productId: number): Promise<void> {
  await API.post(`/api/wishlist/${productId}`)
}
export async function removeWishlist(productId: number): Promise<void> {
  await API.delete(`/api/wishlist/${productId}`)
}
