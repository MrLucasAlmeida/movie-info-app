const BACKEND_URL = 'http://localhost:5000';


function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
}


export async function getMovieListByKeyword(keyword, pageNum) {
    await sleep(2000)
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
    await sleep(2000);
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
    // console.log(response.ok ? data.movieList : data.error);
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
    await sleep(2000);
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
    // console.log(response.ok ? data.movieList : data.error);
    return response.ok ? data.movieList : data.error;
}

export async function getMovieListbyPerson(personId, pageNum) {
    await sleep(1000);
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
    await sleep(2000);
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
    await sleep(1000);
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

