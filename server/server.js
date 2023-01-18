import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const urlGenreList = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`



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

        console.log(response);
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
    
});

app.post('/movielistgenre', async (req, res) => {
    // fetches movie list based on genre
    
});



app.listen(PORT, () => {console.log(`Server is running on port http://localhost:5000`)});