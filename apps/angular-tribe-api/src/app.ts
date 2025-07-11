import express from 'express';
import { readFile } from 'fs/promises';

const app = express();

app.get('/sample', async (req, res) => {
    try {
        const filePath = './public/test-article.md';
        const content = await readFile(filePath, 'utf-8');

        res.json({
            title: 'UI component library',
            size: content.length,
            content,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to read file' });
    }
});

app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
});

app.listen(() => {
    console.log(`[ ready ] application started`);
});
