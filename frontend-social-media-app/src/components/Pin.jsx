import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urlFor } from '../utils/client';
import { v4 as uuidv4 } from 'uuid';
import {MdDownloadForOffline} from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { client, urlFOr } from '../utils/client';

const Pin = ({pin: {postedBy, image, _id, destination }}) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  //navigate is used to navigate to a different page
  const navigate = useNavigate();

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  return (
    <div className='m-2'>
        <div className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
          onMouseEnter={()=> setPostHovered(true)}
          onMouseLeave={()=> setPostHovered(true)}
          // onClick={()=> navigate(`/pin-detail/${_id}`)} redirects the user to the pin detail page
          onClick={()=> navigate(`/pin-detail/${_id}`)}>

          <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" /> 
          {postHovered && (
            <div className='absolute top-0 w-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50' style={{ height: '100%' }}>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2'>
                  {/*will allow us to download the image */}
                  {/*stopPropagation is used to perform the download and prevent being redirected to another page */}
                  <a href={`${image?.asset?.url}?dl=`} download onClick={(e)=> e.stopPropagation()}>
                  <MdDownloadForOffline className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none' />
                  </a>
                </div>  
                
              </div>
            
            </div>
          )}
        </div>


       
    </div>
  )
}

export default Pin;