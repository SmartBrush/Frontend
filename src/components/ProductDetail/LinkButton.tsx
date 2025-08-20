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
      className="inline-block mt-2 ml-1.5 px-2 py-1 bg-[#4E9366] rounded-full text-white text-[0.625rem] font-thin shadow transition"
    >
      {label}
    </a>
  )
}

export default LinkButton
