import React from 'react'

export const CoverModal = ({ cover, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <img
        src={cover}
        alt="cover"
        className="h-full p-8 rounded"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default CoverModal
