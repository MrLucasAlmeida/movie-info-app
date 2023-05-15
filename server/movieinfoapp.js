import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import NodeCache from 'node-cache';
import fetch from 'node-fetch';

import fs from 'fs';
import https from 'https';

dotenv.config();

const API_KEY_TMDB = process.env.TMDB_API_KEY;

const port = 5002;

const urlGenreList = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_TMDB}&language=en-US`
const urlQueryMovieList = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&language=en-US&page=1&include_adult=false`
const urlGenreMovieList = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&`


// create express app
const app = express();
app.use(cors());
app.use(express.json());

// create cache client
const cache = new NodeCache({ stdTTL: 6000 });



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


// middleware for verifying movie by query cache
const verifyMovieByKeywordCache = async (req, res, next) => {
    
    try {
        const keyword = req.body.keyword;
        const page = req.body.pageNum;
        if (cache.has(`keyword-${keyword}-${page}`)) {
            console.log(`keyword-${keyword}-${page}: cache hit`);

            res.status(200).send({
                movieList: cache.get(`keyword-${keyword}-${page}`)
            });
            return;
        }
        console.log(`keyword-${keyword}-${page}: cache miss`);
        next();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
        res.status(500).send({ error });
    }
}

app.post('/movielist/keyword', verifyMovieByKeywordCache, async (req, res) => {
    // fetches movie list based on query
    const keyword = req.body.keyword;
    const page = req.body.pageNum;
    const url = `${urlQueryMovieList}&query=${keyword}&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        // set cache
        console.log(`keyword-${keyword}-${page}: setting cache`);
        cache.set(`keyword-${keyword}-${page}`, data.results);

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
        const page = req.body.pageNum;
        if (cache.has(`genre-${genreId}-${page}`)) {
            console.log(`genre-${genreId}-${page}: cache hit`);

            res.status(200).send({
                movieList: cache.get(`genre-${genreId}-${page}`)
            });
            return;
        }
        console.log(`genre-${genreId}-${page}: cache miss`);
        next();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
        res.status(500).send({ error });
    }
}

app.post('/movielist/genre', verifyMovieByGenreCache, async (req, res) => {
    // fetches movie list based on genre
    const genreId = req.body.genreId;
    const page = req.body.pageNum;
    const url = `${urlGenreMovieList}&with_genres=${genreId}&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // set cache
        console.log(`genre-${genreId}-${page}: setting cache`);
        cache.set(`genre-${genreId}-${page}`, data.results);

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
    const url = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY_TMDB}`;
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
        const movie_id = req.body.movieId;
        console.log(movie_id);
        if (cache.has(`moviedetails-${movie_id}`)) {
            console.log(`moviedetails-${movie_id}: cache hit`);
            

            const movieDetailObject = cache.get(`moviedetails-${movie_id}`);
            res.status(200).send(movieDetailObject);
            return;
        }
        console.log(`moviedetails-${movie_id}: cache miss`);
        next();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
        res.status(500).send({ error });
    }
}

app.post('/details/movie', verifyMovieDetailsCache, async (req, res) => {
    // create urls for information fetching
    const movie_id = req.body.movieId;
    console.log(movie_id);
    
    const holisticURL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY_TMDB}&append_to_response=videos,credits,recommendations&language=en-US`;
    const watchProviderURL = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${API_KEY_TMDB}`

    try {
        // general movie details
        const responseMovieDetails = await fetch(holisticURL);
        const dataMovieDetails = await responseMovieDetails.json();

        // watch providers
        const responseWatchProviders = await fetch(watchProviderURL);
        const dataWatchProviders = await responseWatchProviders.json();
        // console.log(responseWatchProviders);
        // console.log(dataWatchProviders);

        // set cache
        console.log(`moviedetails-${movie_id}: setting cache`);
        const movieDetailObject = {
            mDetails: dataMovieDetails,
            mCredits: dataMovieDetails.credits,
            mVideos: dataMovieDetails.videos,
            mSimilar: dataMovieDetails.recommendations,
            mWatchProviders: dataWatchProviders.results.US
            
        };
        cache.set(`moviedetails-${movie_id}`, movieDetailObject);

        // send response
        res.status(200).send(movieDetailObject);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

const verifyPersonDetailsCache = async (req, res, next) => {
    try {
        const person_id = req.body.personId;
        console.log(person_id);
        if (cache.has(`persondetails-${person_id}`)) {
            console.log(`persondetails-${person_id}: cache hit`);
            

            const personDetailObject = cache.get(`persondetails-${person_id}`);
            res.status(200).send(personDetailObject);
            return;
        }
        console.log(`persondetails-${person_id}: cache miss`);
        next();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
        res.status(500).send({ error });
    }


}

app.post('/details/person', verifyPersonDetailsCache, async (req, res) => {
    // create urls for information fetching
    const person_id = req.body.personId;
    console.log(person_id);
    const urlPersonDetails = `https://api.themoviedb.org/3/person/${person_id}?api_key=${API_KEY_TMDB}&language=en-US`
    
    try {
        const responsePersonDetails = await fetch(urlPersonDetails);
        const dataPersonDetails = await responsePersonDetails.json();


        // set cache
        console.log(`persondetails-${person_id}: setting cache`);
        cache.set(`persondetails-${person_id}`, dataPersonDetails);

        // send response
        res.status(200).send(dataPersonDetails);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }



});

// middleware for checking cache for now playing, popular, top rated, upcoming movies
const verifyMovieByCategoryCache = async (req, res, next) => {
    try {
        const category = req.body.category;
        const page = req.body.pageNum;
        if (cache.has(`category-${category}-${page}`)) {
            console.log(`category-${category}-${page}: cache hit`);

            res.status(200).send({
                movieList: cache.get(`category-${category}-${page}`)
            });
            return;
        }
        console.log(`category-${category}-${page}: cache miss`);
        next();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
        res.status(500).send({ error });
    }
}


// post function for now playing movies, popular movies, top rated movies, upcoming movies
app.post('/movielist/category', verifyMovieByCategoryCache, async (req, res) => {
    // fetches movie list based on genre
    const category = req.body.category;
    const page = req.body.pageNum;
    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY_TMDB}&language=en-US&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        // set cache
        console.log(`category-${category}-${page}: setting cache`);
        cache.set(`category-${category}-${page}`, data.results);

        // send response
        res.status(200).send({
            movieList: data.results
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

const verifyMovieByPeopleCache = async (req, res, next) => {
    try {
        const personId = req.body.personId;
        const page = req.body.pageNum;
        if (cache.has(`people-${personId}-${page}`)) {
            console.log(`people-${personId}-${page}: cache hit`);

            res.status(200).send({
                movieList: cache.get(`people-${personId}-${page}`)
            });
            return;
        }
        console.log(`people-${personId}-${page}: cache miss`);
        next();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
        res.status(500).send({ error });
    }
}


app.post('/movielist/person', verifyMovieByPeopleCache, async (req, res) => {
    // fetches movie list based on genre
    const personId = req.body.personId;
    const page = req.body.pageNum;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_people=${personId}&page=${page}&language=en-US&sort_by=popularity.desc&include_adult=false`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        // set cache
        console.log(`people-${personId}-${page}: setting cache`);
        cache.set(`people-${personId}-${page}`, data.results);

        // send response
        res.status(200).send({
            movieList: data.results
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});








// app.listen(port, () => {console.log(`Server is running on port http://localhost:${port}`)});



const privateKey = fs.readFileSync('/etc/letsencrypt/live/backend.mrlucasalmeida.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/backend.mrlucasalmeida.com/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Backend server listening at https://localhost:${port}`);
});