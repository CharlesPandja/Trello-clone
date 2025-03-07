import React from 'react'

const CloseCartBtn = ({onClose, children}) => {
  return (
    <button onClick={onClose} className="text-sm text-white rounded-sm cursor-pointer px-4 py-2 hover:bg-stone-200 hover:text-black" type="button">{children}</button>
  )
}

export default CloseCartBtn
