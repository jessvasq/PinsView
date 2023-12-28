import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urlFor } from '../utils/client';
import { v4 as uuidv4 } from 'uuid';
import {MdDownloadForOffline} from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { client } from '../utils/client';
import fetchUser from '../utils/fetchUser';

const Pin = ({pin: {postedBy, image, _id, destination, save }}) => {
  const [postHovered, setPostHovered] = useState(false);
  // const [savingPost, setSavingPost] = useState(false);
  //navigate is used to navigate to a different page
  const navigate = useNavigate();
  const user = fetchUser();
  // !! is used to convert the value to a boolean
  const alreadySaved = !!(save?.filter((item)=> item.postedBy?._id === user.sub ))?.length;
  
  //savePin is used to save a pin
  const savePin = (id) => {
    //if the value has not been saved, save it
    if (!alreadySaved) {
      // setSavingPost(true);
    
      client
        //patch is used to update the value 
        .patch(id)
        //setIfMissing is used to set the value if it is missing
        .setIfMissing({ save: [] })
        //insert is used to insert a value into an array 
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: user?.sub,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.sub,
            }

          }])
          //commit is used to commit the changes to the database
        .commit()
        //then is used to perform an action after the commit
        .then(() => {
          //reload is used to reload the page once the commit is done
          window.location.reload();
          // //setSavingPost is used to set the value of savingPost to false which will stop the loading animation
          // setSavingPost(false);
        })
    }

  }

  //deletePin is used to delete a pin
  const deletePin = (id) => {
    client
    //deletes the pin
      .delete(id)
      //commit the changes to the database
      .commit()
      //reload the page once the commit is done
      .then(() => {
        window.location.reload();
      })
  }

  return (
    <div className='m-2'>
        <div className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
          onMouseEnter={()=> setPostHovered(true)}
          onMouseLeave={()=> setPostHovered(false)}
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
                {/*If the value has been saved, display 'saved' else: 'save'  */}
                {alreadySaved ? (
                  <button 
                    type="button" 
                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none '>
                      {save?.length} Saved
                  </button> 
                ) : (
                  <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);  
                    }}
                    type="button" 
                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'>
                    Save
                  </button>
                )}      
              </div>
              
              <div className='flex justify-between items-center gap-2 w-full'>
                {destination && (
                  <a href={destination}
                    target='_blank'
                    rel='noreferrer'
                    className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md'>
                    <BsFillArrowUpRightCircleFill />
                    {/* if the length of the destination is greater than 20, display the first 8 characters else display the entire destination */}
                    {destination.length > 12 ? `${destination.slice(0,15)}...` : destination}
                  </a>
                )}

                
                {/*if the user is the same as the user who posted the pin, display the delete button */}
                {postedBy?._id === user?.sub && (
                  <button
                    onClick={(e) => {
                      //stopPropagation is used to prevent the user from being redirected to another page
                      e.stopPropagation();
                      //deletePin is used to delete a pin
                      deletePin(_id);
                    }}
                    type="button" 
                    className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'>
                      <AiTwotoneDelete />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        {/* user?.name is used to display the name of the user who posted the pin */}
        <Link to={`user-profile/${postedBy?._id}`} className='flex items-center gap-2 mt-2'>
          <img src={postedBy?.image} alt='user-profile' className='w-8 h-8 rounded-full object-cover' />
          <p className='text-xs font-semibold text-gray-700'>{postedBy?.userName}</p>
        </Link>
    </div>
  )
};

export default Pin;