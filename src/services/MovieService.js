const env = require('../components/env');
const config = require('../components/apiConfig')[env];
const token = config.bearer_token;
export async function getAllMovies() {
    try {
        const response = await fetch(config.API_URL +'/api/movie/all', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        return [];
    }
}

export async function createMovie(data) {
    try {
        const response = await fetch(config.API_URL +'/api/movie/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        return { error: 'Failed to create movie' };
    }
}

export async function getMovieSearch(search_text) {
    try {
        const response = await fetch(`${config.API_URL}/api/movie/search?search_text=${search_text}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }          
        });
        return await response.json();
    } catch (error) {
        return [];
    }
}
