const env = require('../components/env');
const config = require('../components/apiConfig')[env];
const token = config.bearer_token;
export async function getAllMovies() {
    var bearer_token = '1234567890';
    
    try {

        //const response = await fetch('http://localhost:4000/api/movie/all',
        
        const response = await fetch('https://api.se-rmutl.net/api/movie/all',
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${bearer_token}`,
                }
            },);
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
