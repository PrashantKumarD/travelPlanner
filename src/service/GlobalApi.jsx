import axios from "axios";

const BASE_URL ="https://places.googleapis.com/v1/places:searchText";


const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.photos,places.rating,places.userRatingCount,places.id'
    }
}

export const GetPlaceDetails=async (data)=>{
    // Debug logs
    console.log('Google API Key:', import.meta.env.VITE_GOOGLE_PLACE_API_KEY);
    console.log('Request body:', data);
    try {
        const response = await axios.post(BASE_URL, data, config);
        return response;
    } catch (error) {
        if (error.response) {
            console.error('API Error:', error.response.data);
        } else {
            console.error('Unknown Error:', error);
        }
        throw error;
    }
}

export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxWidthPx=1500&maxHeightPx=1500&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY