// import React, {useState, useEffect} from 'react';
// import { useParams } from 'react-router-dom';
// //useParams is a hook that allows us to access the parameters of any route that is rendered
// import { client } from '../utils/client';
// import MasonryLayout from './MasonryLayout';
// import Spinner from './Spinner';
// import { feedQuery, searchQuery } from '../utils/data';

// const Feed = () => {
//   const [ loading, setLoading ] = useState(false);
//   const { categoryId } = useParams();
//   const [pins, setPins] = useState();

//   //****update!!! */
//   //will be called at the start and at any time our category changes
//   useEffect(() => {
//     //if we're searching for a specific category, do somehting but if we are in feed, we'll look for all categories
//     if(categoryId) {
//       setLoading(true)
//       const query = searchQuery(categoryId);
//       client.fetch(query).then((data) => {
//         setPins(data);
//         setLoading(false);
//       });
//     } else {
//       setLoading(true)
//       client.fetch(feedQuery).then((data) => {
//         setPins(data)
//         setLoading(false)
//       });
//     }
//   }, [categoryId]);

//   const ideaName = categoryId || 'new';

//   if(loading) {
//     return (
//       <Spinner message={`We are adding ${ideaName} ideas to your feed!`}/>
//       );
//   }

//   return (
//     <div>
//       {pins && (
//         <MasonryLayout pins={pins} />
//       )}
//     </div>
//   )
// }

// export default Feed;


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
  return (
    <div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
};

export default Feed;