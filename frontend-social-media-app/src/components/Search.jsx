import React, { useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';
import { client } from '../utils/client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

//searchTerm is the value that is passed from the search bar as a prop. A prop is a value that is passed from one component to another
const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  //useEffect will change the value of pins based on the value of searchTerm
  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      //searchQuery is used to get the pins that match the searchTerm, the searchTerm could be a category or a pin title or a destination
      const query = searchQuery(searchTerm.toLowerCase());
      //fetch the pins that match the searchTerm
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    //if searchTerm is empty, show all the pins from the feedQuery
    } else {
      //feedQuery is used to get all the pins from the database
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {/*if loading is true, show the loading animation*/}
      {loading && <Spinner message="Searching pins" />}
      {/*if pins is not empty, show the pins*/}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {/*if pins is empty and searchTerm is not empty and loading is false, show the message 'No Pins Found!'*/}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;