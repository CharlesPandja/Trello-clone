import React from 'react';
import Navbar from '../components/Navbar';
const ErrorPage = () => {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center p-10 w-screen min-h-screen bg-zinc-800">
                <div className="text-center text-stone-200 px-30">
                    <h1 className="text-3xl mb-5">Page introuvable</h1>
                    <p className="text-base mb-5">Il se peut que cette page soit privée. Si quelqu'un vous a envoyé ce lien, il se peut que vous deviez être membre de l'espace de travail ou du tableau pour pouvoir y accéder.</p>
                    <button className="h-10 px-3 text-black/80 bg-blue-400 text-base rounded-sm cursor-pointer hover:bg-blue-300">Aller à l'accueil</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
