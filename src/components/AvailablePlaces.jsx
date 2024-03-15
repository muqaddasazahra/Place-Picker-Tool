import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx'

export default function AvailablePlaces({ onSelectPlace }) {
   const [availablePlaces, setAvailablePlaces]=useState([]);
   const [isFetching, setIsFetching]=useState(false);
   const [error, setError]=useState();
   useEffect(()=>{
    async function fetchPlaces()
    { 
      setIsFetching(true)
      try{
        const response= await fetch('http://localhost:3000/laces')
        if(!response.ok)
        {
          throw new Error("Failed to fetch Places!")
        }

        const resData= await response.json()
        setAvailablePlaces(resData.places)
      }
      catch(error)
      {
        setError({message: error.message || 'Could not fetch places. Please try again later!'});
      }
      
      setIsFetching(false)
    } 
    fetchPlaces()}
 ,[])

 if(error)
 return <Error title="An Error occurred!!" message={error.message}/>

  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="Fetching Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
