const fs = require('fs');
const path = require('path');
const https = require('https');

const PIZZA_IMAGES = {
  'pizza-1.jpg': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
  'pizza-2.jpg': 'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=600&q=80',
  'pizza-3.jpg': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
  'pizza-4.jpg': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80',
  'pizza-5.jpg': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
  'pizza-6.jpg': 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
  'pizza-7.jpg': 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=600&q=80',
  'pizza-8.jpg': 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80',
  'hero.jpg': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80'
};

const INGREDIENT_IMAGES = {
  'base-thin.jpg': 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=300&q=80',
  'base-hand.jpg': 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=300&q=80',
  'base-cheese.jpg': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80',
  'base-pan.jpg': 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=300&q=80',
  'base-gluten.jpg': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80',
  'sauce-tomato.jpg': 'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?auto=format&fit=crop&w=300&q=80',
  'sauce-pesto.jpg': 'https://images.unsplash.com/photo-1596450514735-111a2fe02935?auto=format&fit=crop&w=300&q=80',
  'sauce-garlic.jpg': 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=300&q=80',
  'sauce-bbq.jpg': 'https://images.unsplash.com/photo-1626082895617-2c6ad3ed327c?auto=format&fit=crop&w=300&q=80',
  'sauce-spicy.jpg': 'https://images.unsplash.com/photo-1620189507195-68309c04c4d0?auto=format&fit=crop&w=300&q=80',
  'cheese-mozzarella.jpg': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=300&q=80',
  'cheese-cheddar.jpg': 'https://images.unsplash.com/photo-1618164436241-4473940d1fce?auto=format&fit=crop&w=300&q=80',
  'cheese-parmesan.jpg': 'https://images.unsplash.com/photo-1632598337775-8121d5c2f300?auto=format&fit=crop&w=300&q=80',
  'cheese-vegan.jpg': 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=300&q=80',
  'veg-onion.jpg': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=300&q=80',
  'veg-capsicum.jpg': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=300&q=80',
  'veg-mushroom.jpg': 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&w=300&q=80',
  'veg-olive.jpg': 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=300&q=80',
  'veg-jalapeno.jpg': 'https://images.unsplash.com/photo-1506807803488-8eafc15316c7?auto=format&fit=crop&w=300&q=80',
  'veg-corn.jpg': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80',
  'veg-spinach.jpg': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80',
  'veg-pineapple.jpg': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=300&q=80'
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

const run = async () => {
  const publicDir = path.join(__dirname, 'frontend', 'public', 'images');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Downloading Pizza images...');
  for (const [filename, url] of Object.entries(PIZZA_IMAGES)) {
    try {
      await downloadImage(url, path.join(publicDir, filename));
      console.log(`Downloaded ${filename}`);
    } catch (e) {
      console.error(`Failed ${filename}`, e.message);
    }
  }

  console.log('Downloading Ingredient images...');
  for (const [filename, url] of Object.entries(INGREDIENT_IMAGES)) {
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
