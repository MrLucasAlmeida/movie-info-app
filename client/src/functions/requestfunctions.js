const BACKEND_URL = 'https://backend.mrlucasalmeida.com:5002';
// const BACKEND_URL = 'http://localhost:5002';




export async function getMovieListByKeyword(keyword, pageNum) {
    if (keyword === '') return [];

    const response = await fetch(`${BACKEND_URL}/movielist/keyword`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyword, pageNum })
    });
    const data = await response.json();
    return response.ok ? data.movieList : data.error;
}

export async function getMovieListbyGenre(genreId, pageNum) {
    if (genreId === -1) return [];
    const response = await fetch(`${BACKEND_URL}/movielist/genre`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ genreId, pageNum })
    });
    const data = await response.json();
    return response.ok ? data.movieList : data.error;
}

export async function getGenreList() {
    const response = await fetch(`${BACKEND_URL}/genres`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return response.ok ? data.genreList : data.error;
}

export async function getConfiguration() {
    const response = await fetch(`${BACKEND_URL}/configuration`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return response.ok ? data.configuration : data.error;
}

export async function getMovieListbyCategory(category, pageNum) {
    if (category === '') return [];
    const response = await fetch(`${BACKEND_URL}/movielist/category`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category, pageNum })
    });
    const data = await response.json();
    return response.ok ? data.movieList : data.error;
}

export async function getMovieListbyPerson(personId, pageNum) {
    if (personId === '') return [];
    const response = await fetch(`${BACKEND_URL}/movielist/person`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ personId, pageNum })
    });
    const data = await response.json();
    return response.ok ? data.movieList : data.error;
}

export async function getMovieDetails(movieId) {
    const response = await fetch(`${BACKEND_URL}/details/movie`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieId })
    });
    const data = await response.json();
    return response.ok ? data : data.error;
}

export async function getPersonDetails(personId) {
    if (personId === '') return {};
    const response = await fetch(`${BACKEND_URL}/details/person`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ personId })
    });
    const data = await response.json();
    return response.ok ? data : data.error;
}

