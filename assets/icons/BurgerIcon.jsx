import React from 'react'

const BurgerIcon = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={className}>
            <path d="M4 6l16 0">
            </path>
            <path d="M4 12l16 0">
            </path>
            <path d="M4 18l16 0">
            </path>
        </svg>
    )
}

export default BurgerIcon