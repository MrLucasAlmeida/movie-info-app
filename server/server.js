import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const urlGenreList = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
const urlQueryMovieList = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false`
const urlGenreMovieList = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&`

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;




// dummy route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// GET request for list of movie genres
app.get('/genres', async (req, res) => {
    try {
        const response = await fetch(urlGenreList);
        const data = await response.json();

        res.status(200).send({
            genreList: data.genres
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
    
});




app.post('/movielistquery', async (req, res) => {
    // fetches movie list based on query
    const query = req.body.query;
    const url = `${urlQueryMovieList}&query=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        res.status(200).send({
            movieList: data.results
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
    
});

app.post('/movielistgenre', async (req, res) => {
    // fetches movie list based on genre
    const genreId = req.body.genreId;
    const url = `${urlGenreMovieList}&with_genres=${genreId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

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

app.post('/image', async (req, res) => {
    const imagePath = req.body.imagePath;
    const url = `https://image.tmdb.org/t/p/w500/${imagePath}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        res.status(200).send({
            image: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});



app.listen(PORT, () => {console.log(`Server is running on port http://localhost:5000`)});