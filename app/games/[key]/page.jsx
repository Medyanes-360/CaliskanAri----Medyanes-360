'use client'
import Link from 'next/link'
import React from 'react'

const Games = ({ params }) => {
    return <div className="w-full h-screen flex flex-col overflow-hidden">
        <Link className='p-2 rounded-md bg-slate-700 text-white text-center' href={"/games"}>
            Oyunlara Dön
        </Link>
        <iframe className='w-full h-full' src={`https://ofistikgamesbucket.s3.eu-north-1.amazonaws.com/${params.key}/story.html`} />
    </div>
}

export default Games