import API from './api'
import type { Product } from '../types/Product'

// 전체 상품 리스트
export async function fetchProducts(): Promise<Product[]> {
  const { data } = await API.get<Product[]>('/products')
  return data
}

// 단일 상품 조회
export async function fetchProductById(id: string): Promise<Product> {
  const { data: all } = await API.get<Product[]>('/products')
  const index = Number(id) - 1
  const prod = all[index]
  if (!prod) {
    throw new Error('Not Found')
  }
  return prod
}

// 좋아요 상태 조회
export async function fetchLikeStatus(
  productId: number,
): Promise<{ liked: boolean }> {
  const { data } = await API.get<{ liked: boolean }>(
    `/products/${productId}/like/status`,
  )
  return data
}

// 좋아요 토글 (POST 또는 DELETE)
export async function toggleLike(
  productId: number,
  liked: boolean,
): Promise<{ liked: boolean }> {
  const method = liked ? 'delete' : 'post'
  const { data } = await API[method]<{ liked: boolean }>(
    `/products/${productId}/like`,
  )
  return data
}
