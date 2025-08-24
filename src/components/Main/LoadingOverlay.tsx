import Spinner from './Spinner'

type LoadingOverlayProps = {
  message?: string
}

const LoadingOverlay = ({ message = '로그인 중…' }: LoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-white px-6 py-5 shadow-lg">
        <Spinner size={36} />
        <p className="text-sm text-gray-700">{message}</p>
      </div>
    </div>
  )
}

export default LoadingOverlay
