import type { Product } from '../../apis/products'

interface LinkButtonProps {
  product: Product
  label?: string
}

const LinkButton = ({ product, label = '구매하러가기' }: LinkButtonProps) => {
  if (!product || !product.link) console.log('🧪 link:', product.link)

  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-2 px-2 py-1 rounded-full bg-green-200 text-green-900 text-xs font-semibold shadow hover:bg-green-300 transition"
    >
      {label}
    </a>
  )
}

export default LinkButton
