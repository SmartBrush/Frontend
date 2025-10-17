import React from 'react'

type AlertModalProps = {
  open: boolean
  title?: string
  message: string
  confirmText?: string
  onClose: () => void
}

const AlertModal: React.FC<AlertModalProps> = ({
  open,
  title = '알림',
  message,
  confirmText = '확인',
  onClose,
}) => {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-modal-title"
      aria-describedby="alert-modal-desc"
      onClick={onClose}
    >
      <div
        className="w-[320px] max-w-[90%] rounded-xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="alert-modal-title" className="text-lg font-semibold text-black">
          {title}
        </h2>
        <p id="alert-modal-desc" className="mt-3 text-sm text-gray-700">
          {message}
        </p>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-[#4E9366] px-4 py-2 text-white hover:bg-[#3D7450] focus:outline-none cursor-pointer"
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertModal
