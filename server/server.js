import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import NodeCache from 'node-cache';

dotenv.config();
const PORT = process.env.PORT || 5000;

const urlGenreList = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
const urlQueryMovieList = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false`
const urlGenreMovieList = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&`


// create express app
const app = express();
app.use(cors());
app.use(express.json());

// create cache client
const cache = new NodeCache({ stdTTL: 300 });










// dummy route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// middleware for verifying genre list cache
const verifyGenreListCache = async (req, res, next) => {
    try {
        const query = req.body.query;
        if (cache.has('genreList')) {
            console.log("GenreList: cache hit");

            res.status(200).send({
                genreList: cache.get('genreList')
            });
            return;
        }
        console.log("GenreList: cache miss");
        next();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
        res.status(500).send({ error });
    }
}

// GET request for list of movie genres
app.get('/genres', verifyGenreListCache, async (req, res) => {
    try {
        const response = await fetch(urlGenreList);
        const data = await response.json();

        // set cache
        console.log("GenreList: setting cache");
        cache.set('genreList', data.genres);


        res.status(200).send({
            genreList: data.genres
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
    
});


// middleware for verifying movie by genre cache
const verifyMovieByQueryCache = async (req, res, next) => {
    try {
        const query = req.body.query;
        if (cache.has(`query-${query}`)) {
            console.log("QueryMovieList: cache hit");

            res.status(200).send({
                movieList: cache.get(`query-${query}`)
            });
            return;
        }
        console.log("QueryMovieList: cache miss");
        next();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
        res.status(500).send({ error });
    }
}

app.post('/movielistquery', verifyMovieByQueryCache, async (req, res) => {
    // fetches movie list based on query
    const query = req.body.query;
    const url = `${urlQueryMovieList}&query=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        // set cache
        console.log("QueryMovieList: setting cache");
        cache.set(`query-${query}`, data.results);

        res.status(200).send({
            movieList: data.results
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
    
});


// middleware for verifying movie by genre cache
const verifyMovieByGenreCache = async (req, res, next) => {
    try {
        const genreId = req.body.genreId;
        if (cache.has(`genre-${genreId}`)) {
            console.log("GenreMovieList: cache hit");

            res.status(200).send({
                movieList: cache.get(`genre-${genreId}`)
            });
            return;
        }
        console.log("GenreMovieList: cache miss");
        next();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
        res.status(500).send({ error });
    }
}

app.post('/movielistgenre', verifyMovieByGenreCache, async (req, res) => {
    // fetches movie list based on genre
    const genreId = req.body.genreId;
    const url = `${urlGenreMovieList}&with_genres=${genreId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // set cache
        console.log("GenreMovieList: setting cache");
        cache.set(`genre-${genreId}`, data.results);

        // send response
        res.status(200).send({
            movieList: data.results
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.get('/configuration', async (req, res) => {
    const url = `https://api.themoviedb.org/3/configuration?api_key=${process.env.TMDB_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        res.status(200).send({
            configuration: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});


// middleware for verifying movie details cache
const verifyMovieDetailsCache = async (req, res, next) => {
    try {
        const movie_id = req.params.id;
        if (cache.has(`moviedetails-${movie_id}`)) {
            console.log("MovieDetails: cache hit");
            

            const movieDetailObject = cache.get(`moviedetails-${movie_id}`);
            res.status(200).send(movieDetailObject);
            return;
        }
        console.log("MovieDetails: cache miss");
        next();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
        res.status(500).send({ error });
    }
}

app.post('/movie/:id',  async (req, res) => {
    // create urls for information fetching
    const movie_id = req.params.id;
    console.log(movie_id);
    const urlMovieDetails = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    const urlMovieCredits = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    const urlMovieVideos = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`


    try {
        const responseMovieDetails = await fetch(urlMovieDetails);
        const dataMovieDetails = await responseMovieDetails.json();

        const responseMovieCredits = await fetch(urlMovieCredits);
        const dataMovieCredits = await responseMovieCredits.json();

        const responseMovieVideos = await fetch(urlMovieVideos);
        const dataMovieVideos = await responseMovieVideos.json();


        // set cache
        console.log("MovieDetails: setting cache");
        const movieDetailObject = {
            movieDetails: dataMovieDetails,
            movieCredits: dataMovieCredits,
            movieVideos: dataMovieVideos
        };
        cache.set(`moviedetails-${movie_id}`, movieDetailObject);


        // send response
        res.status(200).send(movieDetailObject);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }







});











app.listen(PORT, () => {console.log(`Server is running on port http://localhost:5000`)});