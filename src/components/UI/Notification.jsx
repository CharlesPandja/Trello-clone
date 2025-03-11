import React from 'react';

const Notification = ({ status, title, message }) => {
    return (
        <div className="w-auto h-10 text-xs text-white">
            {status === 'success' &&
                <div className="flex justify-between rounded-sm w-[300px] font-semibold p-3 items-center bg-green-400">
                    <div> {title} </div>
                    <div> {message} </div>
                </div>
            }
            {status === 'error' &&
                <div className="flex justify-between rounded-sm w-[300px] font-semibold p-3 items-center bg-red-600">
                    <div> {title} </div>
                    <div> {message} </div>
                </div>
            }
            {status === 'pending' &&
                <div className="flex justify-between rounded-sm w-[300px] font-semibold p-3 items-center bg-stone-500">
                    <div> {title} </div>
                    <div> {message} </div>
                </div>
            }
        </div>
    )
}

export default Notification
