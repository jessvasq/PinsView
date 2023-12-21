import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
//useParams is a hook that allows us to access the parameters of any route that is rendered
import {client } from '../utils/client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { searchQuery } from '../utils/data';

const Feed = () => {
  const [loading, setLoading ] = useState(true)
  const {categoryId } = useParams();
  //we'll make this message dynamic
  if(loading) return <Spinner message='Loading new ideas' />



  return (
    <div>
      Feed
    </div>
  )
}

export default Feed
