import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import compression from 'compression';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80; // Default to 80 for Coolify/Container

// Security and Optimization
app.use(helmet({
    contentSecurityPolicy: false, 
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" } // Required for YouTube Embeds
}));
app.use(compression());
app.use(express.json());

// Database Setup
const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}
const dbPath = path.join(dbDir, 'database.sqlite');

let db;

(async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS visits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                count INTEGER DEFAULT 0
            );
            INSERT OR IGNORE INTO visits (id, count) VALUES (1, 0);
        `);
        console.log('Connected to SQLite database.');
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
})();

// API Endpoints
app.get('/api/visits', async (req, res) => {
    try {
        const result = await db.get('SELECT count FROM visits WHERE id = 1');
        // Increment immediately on get (simple hit counter) or use separate POST
        // For simplicity: Increment on GET (which usually implies a page load visit)
        // Ideally, we might want a POST, but let's stick to simple REST.
        // Let's separate: GET just reads. Client calls POST to increment.
        res.json({ count: result ? result.count : 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/visits', async (req, res) => {
    try {
        await db.run('UPDATE visits SET count = count + 1 WHERE id = 1');
        const result = await db.get('SELECT count FROM visits WHERE id = 1');
        res.json({ count: result.count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Serve Static Files (Vite Build)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA Fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
