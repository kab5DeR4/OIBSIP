const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES = {
  'sauce-bbq.jpg': 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8dd?auto=format&fit=crop&w=300&q=80',
  'cheese-cheddar.jpg': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80', // block of cheese
  'cheese-parmesan.jpg': 'https://images.unsplash.com/photo-1627042633145-b780d842ba45?auto=format&fit=crop&w=300&q=80' // grated/block cheese
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return https.get(res.headers.location, (redirectRes) => {
          if (redirectRes.statusCode === 200) {
            redirectRes.pipe(fs.createWriteStream(filepath))
                       .on('error', reject)
                       .once('close', () => resolve(filepath));
          } else {
            reject(new Error(`Redirect Request Failed With a Status Code: ${redirectRes.statusCode}`));
          }
        });
      }
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const run = async () => {
  const publicDir = path.join(__dirname, 'frontend', 'public', 'images');
  console.log('Downloading missing images...');
  for (const [filename, url] of Object.entries(IMAGES)) {
    try {
      await downloadImage(url, path.join(publicDir, filename));
      console.log(`Downloaded ${filename}`);
    } catch (e) {
      console.error(`Failed ${filename}`, e.message);
    }
  }
  console.log('Done!');
};

run();
