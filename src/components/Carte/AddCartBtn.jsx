import React from 'react'

const AddCartBtn = ({onAdd, children}) => {
    return (
        <button
            onClick={onAdd}
            className="text-sm text-black rounded-sm cursor-pointer bg-blue-400 px-4 py-2 hover:bg-blue-300 mr-2"
            type="button"
        >
            {children}
        </button>
    )
}

export default AddCartBtn
