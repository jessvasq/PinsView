import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import {MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { client } from '../utils/client';
import Spinner from './Spinner';
import { categories } from '../utils/data';


const CreatePin = ({user}) => {

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState();
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImage, setWrongImage] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];


    if( selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/jpg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/svg'|| selectedFile.type === 'image/tiff' ) {
      setWrongImage(false);
      setLoading(true);
      client.assets
            .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
            .then((document) => {
              setImageAsset(document);
              setLoading(false);
            })
            .catch((err) => {
              console.log('Upload failed: ', err);
            });
    } else {
      setWrongImage(true);
      setLoading(false);
    }
  };
   

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _ref: imageAsset?._id,
            _type: 'reference',
          },
        },
        userId: user?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user?._id,
        },
        category,
      };
        client.create(doc).then(()=> {
          navigate('/');
        });
      } else {
        setFields(true);

        //setFields to false after 3 seconds to remove the error message
        setTimeout(() => {
          setFields(false);
        }, 3000);
      }  
    }


  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
          Fill out all fields
        </p>
      )}
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && (<Spinner />)}
            {wrongImage && (
              <p className='text-red-500 text-center text-xl mt-2'>Wrong image type </p>
            )}

            {!imageAsset ? (
              <label>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col items-center justify-center'>
                    <p className='font-bold text-2xl text-center'>
                      <AiOutlineCloudUpload /></p>

                    <p className='text-center text-xl'>Upload Image</p>
                </div>

                <p className='mt-10 text-gray-400 text-center'>Use high-quality JPG, SVG, PNG, GIF less than 20MB</p>
                </div>
                <input
                  type='file'
                  name='upload-image'
                  onChange={uploadImage}
                  className='w-0 h-0' />
              </label>
              
            ) : (
              <div className='relative h-full'>
                <img src={imageAsset?.url} alt='user-post' className='w-full h-full' />
                <button
                  type ='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                  onClick={()=>{
                    setImageAsset(null);
                  }}>
                  <MdDelete />
                </button>
              </div>
            )}
        </div>
      </div>

      <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
        <input
          type='text'
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          placeholder='Insert your title here'
          className='outline-none text-xl sm:text-3xl font-semibold border-b-2 border-gray-100 p-2'/>

      {user && (
        <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
          <img 
            src={user.image}
            alt='user-pic'
            className='w-10 h-10 rounded-full' />
          <p className='text-xl font-bold'>{user.userName}</p>
        </div> )}

        <input
          type='text'
          value={about}
          onChange={(e)=> setAbout(e.target.value)}
          placeholder="What's your pin about"
          className='outline-none text-base sm:text-lg border-b-2 border-gray-100 p-2'/>
     
     <input
          type='url'
          value={destination}
          onChange={(e)=> setDestination(e.target.value)}
          placeholder="Add a destination link"
          className='outline-none text-base sm:text-lg border-b-2 border-gray-100 p-2'/>

    <div className='flex flex-col'>
      <div>
        <p className='mb-2 font-semibold text-base sm:text-xl'>Chose Pin Category</p>
        <select
          onChange={(e) => {setCategory(e.target.value)}}
          className='outline-none w-4/5 text-base border-b-2 border-gray-100 p-2 rounded-md cursor-pointer'>
          <option value='other' className='sm:text-bg bg-white'>Select category</option>
          {categories.map((item) => (
            <option value={item.name} className='text-base border-0 outline-none capitalize bg-white text-black'>{item.name}</option>
          ))}
        </select>
      </div>

      <div className='flex justify-end items-end mt-5'>
        <button type='button' onClick={savePin} className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'> Save Pin </button>

          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CreatePin;