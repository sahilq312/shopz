import {useState} from "react";
type Props = {
  params : {
      id : string
  }

}

import React from 'react'

const page = ({params : {id}} : Props) => {

  fetch(`http://localhost:3000/api/product/${id}`)
  .then((response) => response.json())
  
  return (
    <div>page {id}</div>
  )
}

export default page