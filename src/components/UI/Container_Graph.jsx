import React from 'react'

const Container_Graph = ({children,className}) => {
  return (
    <div className={className + ' border-dotted border-2 border-gray-200 hover:border-sky-200 ease-in duration-100'}>
      {children}
    </div>
  )
}

export default Container_Graph
