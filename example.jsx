const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const Database = require('better-sqlite3');

// SQLite database connection
const db = new Database('your-database.sqlite');

// Function to insert user
async function insertUser({ username, password, role, image }) {
  const saltRounds = 10;

  try {
    // 1. Hash password
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    // 2. Define image save path
    const imageName = `${Date.now()}-${image.name}`;
    const destPath = path.join(__dirname, '../src/assets/images', imageName);

    // 3. Save image buffer to destPath
    const imageBuffer = Buffer.from(image.buffer); // Ensure image.buffer is ArrayBuffer or Buffer
    fs.writeFileSync(destPath, imageBuffer);

    // 4. Save user data to database
    const relativeImagePath = `src/assets/images/${imageName}`;
    const query = db.prepare('INSERT INTO users (username, password, role, image_path) VALUES (?, ?, ?, ?)');
    const result = query.run(username, hashedPassword, role, relativeImagePath);

    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = { insertUser };


// preload.js
contextBridge.exposeInMainWorld('post', {
  insertUser: (formData) => {
    const entries = {};
    formData.forEach((value, key) => {
      entries[key] = value;
    });

    const file = entries.image;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const payload = {
          username: entries.username,
          password: entries.password,
          role: entries.role,
          image: {
            name: file.name,
            buffer: Array.from(new Uint8Array(reader.result)) // to send via IPC
          }
        };

        window.electron.ipcRenderer.invoke('insert-user', payload)
          .then(resolve)
          .catch(reject);
      };

      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
});


const { ipcMain } = require('electron');
const { insertUser } = require('./model');

ipcMain.handle('insert-user', async (event, userData) => {
  // Convert image.buffer back from Array to Buffer
  if (userData.image && Array.isArray(userData.image.buffer)) {
    userData.image.buffer = Buffer.from(userData.image.buffer);
  }

  const result = await insertUser(userData);
  return result;
});

const imgDir = path.join(__dirname, '../src/assets/images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}
