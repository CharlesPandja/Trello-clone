import React from 'react';

const SidebarBtn = ({ children, paddingL, source, name, isActive, onSelect }) => {
    const style = `pl-${paddingL} mb-1 flex justify-left items-center p-3 gap-3 w-full text-sm font-semibold rounded-md cursor-pointer`;
    return (
            <div onClick={onSelect} className={isActive ? `${style} bg-blue-900/40 text-blue-400` : `${style} bg-transparant text-stone-200 hover:bg-stone-600`}>
                <img className="w-4" src={source} alt={name} />
                {children}
            </div>
    )
}

export default SidebarBtn
