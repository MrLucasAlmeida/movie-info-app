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
    // console.log(response.ok ? data.movieList : data.error);
    return response.ok ? data.movieList : data.error;
}

export async function getMovieListbyGenre(genreId, pageNum) {
    if (genreId === -1) return [];
    console.log(pageNum);
    const response = await fetch(`${BACKEND_URL}/movielist/genre`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ genreId, pageNum })
    });
    const data = await response.json();
    console.log(response.ok ? data.movieList : data.error);
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
    // console.log(response.ok ? data.genreList : data.error);
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
    console.log('configuration below');
    console.log(data);
    return response.ok ? data.configuration : data.error;
}

export async function getMovieListbyCategory(category, pageNum) {
    if (category === '') return [];
    console.log(pageNum);
    const response = await fetch(`${BACKEND_URL}/movielist/category`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category, pageNum })
    });
    const data = await response.json();
    console.log(response.ok ? data.movieList : data.error);
    return response.ok ? data.movieList : data.error;
}

export async function getMovieListbyPerson(personId, pageNum) {
    if (personId === '') return [];
    console.log(pageNum);
    const response = await fetch(`${BACKEND_URL}/movielist/person`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ personId, pageNum })
    });
    const data = await response.json();
    // console.log(response.ok ? data.movieList : data.error);
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
    // console.log('got movie details back');
    // console.log(response.ok ? data : data.error);
    console.log(data);
    return response.ok ? data : data.error;
}

export async function getPersonDetails(personId) {
    if (personId === '') return {};
    console.log(personId);
    const response = await fetch(`${BACKEND_URL}/details/person`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ personId })
    });
    const data = await response.json();
    // console.log(data);
    return response.ok ? data : data.error;
}

