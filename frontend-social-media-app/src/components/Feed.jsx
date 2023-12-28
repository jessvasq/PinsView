import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../utils/client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }

  if(!pins?.length) {
    return (
      <div className='flex flex-col items-center justify-center h-full mt-10'>
        <h1 className='text-2xl font-bold mb-5 '>No ideas found</h1>
        <p className='text-xl mb-5'>Try searching for something else</p>
      </div>
    )
  }
  return (
    <div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
};

export default Feed;