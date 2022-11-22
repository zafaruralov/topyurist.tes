import React from 'react'

const index = ({title, icon, type, onClick, className=null, ...props}) => {
  return (
    <button className={`btn ${(className)}`} onClick={onClick} {...props} type={type}>
        {icon && <span>{icon}</span>}
        <p>{title}</p>
    </button>
  )
}

export default index