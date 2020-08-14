import { ADD_PLACE, SET_PLACES } from '../action/placesAct';
import { Place } from '../../models/place';

const initalState = {
    places: []
}

export const placesReducer = (state = initalState, action) => {
    switch(action.type) {
        case SET_PLACES:
            return{
                places: action.places.map(pl => new Place(
                    id = pl.id.toString(),
                    title = pl.title,
                    image = pl.image,
                    address = pl.address,
                    lat = pl.lat,
                    lng = pl.lng
                ))
            }
        case ADD_PLACE:
            const newPlace = new Place(
                id = action.placeData.id.toString(),
                title = action.placeData.title,
                image = action.placeData.image,
                address = action.placeData.address,
                lat = action.placeData.coords.lat,
                lng = action.placeData.coords.lng
            );
            return {
                places: state.places.concat(newPlace)
            }
        default: 
            return state;
    }
}