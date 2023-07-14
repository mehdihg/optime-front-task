import React from 'react'

function Button({text,isOpen,setIsOpen}) {
    const handleClick=()=>{
        setIsOpen(!isOpen)
    }
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

export default Button