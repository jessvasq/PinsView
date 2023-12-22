import React from 'react'
import { urlFor } from '../utils/client';

const Pin = ({pin: {postedBy, image, _id, destination }}) => {
  return (
    <div>Pin
        <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" /> 
    </div>
  )
}

export default Pin;