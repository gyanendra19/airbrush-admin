const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View engine setup
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views/layouts/'),
  partialsDir: path.join(__dirname, 'views/partials/'),
  defaultLayout: 'main',
}));
app.set('view engine', 'hbs');

// View routes
app.get('/', (req, res) => {
  res.render('index', { 
    partialName: 'placeholder',
    title: 'Admin Dashboard',
    activeMenu: 'dashboard'
  });
});

app.get('/hero-section', (req, res) => {
  res.render('index', {
    partialName: 'hero-section',
    section: { title: 'Hero section', description: 'Studio Ghibli is amazing!' }
  });
});

app.get('/edit-category', (req, res) => {
  res.render('index', {
    partialName: 'edit-category',
    section: { title: 'Edit Category', description: 'Edit Category' }
  });
});

app.get('/text-to-anything', (req, res) => {
  res.render('index', {
    partialName: 'text-to-anything',
    section: { title: 'Text to Anything', description: 'Text to Anything' }
  });
});

app.get('/blogs', (req, res) => {
  res.render('index', {
    partialName: 'blogs',
    section: { title: 'Blogs', description: 'Blogs' }
  });
});

app.get('/new-category', (req, res) => {
  res.render('index', {
    partialName: 'new-category',
    section: { title: 'New Category', description: 'New Category' }
  });
});

app.get('/why-use-tool', (req, res) => {
  res.render('index', {
    partialName: 'why-use-tool',
    section: { title: 'Why use the tool', description: 'Why use the tool section' }
  });
});

app.get('/images-gallery', (req, res) => {
  res.render('index', {
    partialName: 'image-gallery',
    section: { title: 'Image Gallery', description: 'Gallery of images' }
  });
});

// Additional routes
app.get('/analytics', (req, res) => {
  res.render('index', { 
    title: 'Analytics Dashboard',
    activeMenu: 'analytics'
  });
});

app.get('/users', (req, res) => {
  res.render('index', { 
    title: 'User Management',
    activeMenu: 'users'
  });
});

app.get('/products', (req, res) => {
  res.render('index', { 
    title: 'Product Management',
    activeMenu: 'products'
  });
});

app.get('/orders', (req, res) => {
  res.render('index', { 
    title: 'Order Management',
    activeMenu: 'orders'
  });
});

app.get('/settings', (req, res) => {
  res.render('index', { 
    title: 'Settings',
    activeMenu: 'settings'
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('API endpoints available:');
  console.log('- POST /api/images');
  console.log('- POST /api/categories');
  console.log('- POST /api/sections');
  console.log('- POST /api/content');
});
