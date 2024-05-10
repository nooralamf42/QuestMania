import React from 'react'

function Container({className,children}) {
  return (
    <section className={`max-w-7xl w-full mx-auto md:px-0 px-8 ${className}`}>{children}</section>
  )
}

export default Container