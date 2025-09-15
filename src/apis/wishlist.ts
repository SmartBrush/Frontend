import API from './api'

export type WishlistItem = {
  id: number
  brand: string
  name: string
  price: string
  image: string
  link: string
  category: string
}

export const fetchWishlist = async (): Promise<WishlistItem[]> => {
  const res = await API.get('/api/wishlist')
  return Array.isArray(res.data) ? (res.data as WishlistItem[]) : []
}
