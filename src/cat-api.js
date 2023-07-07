import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_eaoy0NBQRAaM2g87waEAE5wIJFurROmL3GXkUa9BFt7btU42gpBfL8h1uA6iorCK';

const BASE_URL = 'https://api.thecatapi.com/v1';

export class JSONArrayAPI {
fetchBreeds() {
    return fetch(`${BASE_URL}/breeds`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
    }

    fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}
}
