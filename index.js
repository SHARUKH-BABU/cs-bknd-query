import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8002 ;

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const snippets = {};

app.get('/snippets', (_, res) => {
  res.status(200).json(snippets);
});

app.post('/events', (req, res) => {
    const event = req.body;

    if(event.type === "SnippetCreated") {
        const { id, title, code } = event.data;
        snippets[id] = { id, title, comments: []};
    }
    else if (event.type === "CommentCreated") {
        const { id, content, snippetId } = event.data;
        snippets[snippetId].comments.push({ id, content });
    }
    res.status(200).json({ status: 'OK' });
});


app.listen(PORT, () => {
  console.log(`Query service is running on port ${PORT}`);
});