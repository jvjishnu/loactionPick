import { documentDirectory, moveAsync } from 'expo-file-system';
import { addPlaces, fetchPlaces } from '../../helpers/db';
import { key } from '../../../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const fetchPlace = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
        
            dispatch({  type: SET_PLACES, places: dbResult.rows._array });
        } catch(err) {
            throw err
        }
    }
}

export const addPlace = (title, image, location) => {
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${key.googleApiKey}`);
        const resData = await response.json();
        
        if(!resData.results) {
            throw new Error('Something went wrong');
        }

        const address = resData.results[0].formatted_address;

        const fileName = image.split('/').pop();
        const newPath = documentDirectory + fileName;
        
        try {
            await moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await addPlaces(title, newPath, address, location.lat, location.lng);
            console.log(dbResult);

            dispatch({ type: ADD_PLACE, placeData: {
                id: dbResult.insertId,
                title,
                image: newPath,
                location,
                address,
                coords: {
                    lat: location.lat,
                    lng: location.lng
                }
            } });
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }
}