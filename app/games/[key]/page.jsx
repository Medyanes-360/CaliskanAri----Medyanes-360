'use client'
import React from 'react'

const Games = ({ params }) => {
    return <iframe className='w-screen h-screen' src={`https://ofistikgamesbucket.s3.eu-north-1.amazonaws.com/${params.key}/story.html`} />
}

export default Games