export async function getMovieListByQuery(query) {
    if (query === '') return [];

    const response = await fetch('http://localhost:5000/movielistquery', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    const data = await response.json();
    // console.log(response.ok ? data.movieList : data.error);
    return response.ok ? data.movieList : data.error;
}

export async function getMovieListbyGenre(genreId) {

    if (genreId === -1) return [];
    const response = await fetch('http://localhost:5000/movielistgenre', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ genreId })
    });
    const data = await response.json();
    // console.log(response.ok ? data.movieList : data.error);
    return response.ok ? data.movieList : data.error;
}


export async function getGenreList() {
    const response = await fetch('http://localhost:5000/genres', {
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
    const response = await fetch('http://localhost:5000/configuration', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(response.ok ? data.configuration : data.error);
    return response.ok ? data.configuration : data.error;
}


export async function getMovieDetails(movieId) {
    const response = await fetch(`http://localhost:5000/movie/${movieId}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieId })
    });
    const data = await response.json();
    console.log('got movie details back');
    console.log(response.ok ? data : data.error);
    return response.ok ? data : data.error;
}

