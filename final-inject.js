const db = require('better-sqlite3')('C:\Users\DELL\Downloads\Asset-Manager (3)\Asset-Manager\lib\db\local.db');
const crypto = require('crypto');

// Target the correct table
const table = 'legends';

const insert = db.prepare(`INSERT INTO ${table} (id, title, content, type, grove_id) VALUES (?, ?, ?, ?, ?)`);

const addData = (title, content, type) => {
    try {
        insert.run(crypto.randomUUID(), title, content, type, '1');
        console.log(`? Added: ${title}`);
    } catch (e) {
        console.error(`? Failed to add ${title}:`, e.message);
    }
};

// Adding 3 Scientific entries
addData('Hydrological Buffer Zones', 'Sacred groves act as sponge-like ecosystems. During monsoon, the uncompacted soil absorbs massive amounts of rainfall, recharging the groundwater table.', 'scientific');
addData('Biodiversity Corridors', 'Dense vegetation provides a safe passage for pollinators and birds between forest patches, maintaining genetic diversity.', 'scientific');
addData('Micro-Climate Regulation', 'The thick canopy creates a localized micro-climate that stays cooler than open fields, protecting heat-sensitive plant species and soil microbes.', 'scientific');
