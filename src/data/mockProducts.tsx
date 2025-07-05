//올리브영 크롤링 전까지의 임시 데이터
import product1 from '../assets/product1.svg'
import product2 from '../assets/product2.svg'
import product3 from '../assets/product3.svg'
import product4 from '../assets/product4.svg'

export interface Product {
  id: string
  imageUrl: string
  brand: string
  name: string
  price: string
}

export const mockProducts: Product[] = [
  {
    id: '1',
    imageUrl: product1,
    brand: '려',
    name: '루트젠 탈모 증상 전문 케어 두피 에센스',
    price: '₩19,000',
  },
  {
    id: '2',
    imageUrl: product2,
    brand: '라보에이치',
    name: '두피강화 클리닉 탈모증상 샴푸',
    price: '₩19,200',
  },
  {
    id: '3',
    imageUrl: product3,
    brand: '스팀 베이스',
    name: '티트리 스칼프 워터 스케일러',
    price: '₩52,000',
  },
  {
    id: '4',
    imageUrl: product4,
    brand: '마녀공장',
    name: '바이옥실 안티 헤어로스 샴푸',
    price: '₩16,000',
  },
]
