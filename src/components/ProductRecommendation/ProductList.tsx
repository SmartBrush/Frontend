// 내 두피에 맞는 제품 리스트
import ProductListItem from './ProductListItem'
import { mockProducts } from '../../data/mockProducts'
import type { Product } from '../../data/mockProducts'

interface Props {
  onSelect: (id: string) => void
}

const ProductList: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {mockProducts.map((item: Product) => (
        <ProductListItem
          key={item.id}
          id={item.id}
          imageUrl={item.imageUrl}
          brand={item.brand}
          name={item.name}
          price={item.price}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </div>
  )
}

export default ProductList
