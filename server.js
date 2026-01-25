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
    console.log(`Directory ${dbDir} does not exist. Attempting to create...`);
    try {
        fs.mkdirSync(dbDir);
        console.log(`Directory created successfully.`);
    } catch (e) {
        console.error(`Failed to create directory: ${e.message}`);
    }
}
const dbPath = path.join(dbDir, 'database.sqlite');
console.log(`Database path: ${dbPath}`);

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
        console.log('Connected to SQLite database successfully.');
    } catch (err) {
        console.error('FATAL: Error connecting to database:', err);
    }
})();

// API Endpoints
app.get('/api/visits', async (req, res) => {
    try {
        if (!db) throw new Error('Database not initialized');
        const result = await db.get('SELECT count FROM visits WHERE id = 1');
        res.json({ count: result ? result.count : 0 });
    } catch (err) {
        console.error('GET /api/visits error:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.post('/api/visits', async (req, res) => {
    try {
        if (!db) throw new Error('Database not initialized');
        await db.run('UPDATE visits SET count = count + 1 WHERE id = 1');
        const result = await db.get('SELECT count FROM visits WHERE id = 1');
        res.json({ count: result.count });
    } catch (err) {
        console.error('POST /api/visits error:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
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
