const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(16).toString('hex');
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Image upload endpoint
router.post('/images', upload.single('images'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    console.log('Image uploaded successfully:', imageUrl);
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Category endpoint
router.post('/categories', (req, res) => {
  try {
    const { name, slug, description, image, isFolder, parent } = req.body;
    console.log('Creating category:', { name, slug, description, image });
    
    const newCategory = {
      _id: crypto.randomBytes(12).toString('hex'),
      name,
      slug,
      description,
      image,
      isFolder,
      parent,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Category created:', newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Sections endpoint
router.post('/sections', (req, res) => {
  try {
    const { name, slug, description, category, isFolder, order, isActive } = req.body;
    console.log('Received section creation request with data:', {
      name,
      slug,
      description,
      category,
      isFolder,
      order,
      isActive
    });
    
    // Validate required fields
    if (!name || !slug || !category) {
      console.error('Missing required fields:', { name, slug, category });
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: { name, slug, category }
      });
    }
    
    // For testing purposes, allow test category IDs
    if (category === 'test-category-id-123') {
      const newSection = {
        _id: crypto.randomBytes(12).toString('hex'),
        name,
        slug,
        description,
        category,
        isFolder: isFolder || false,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      console.log('Creating test section:', newSection);
      return res.status(201).json(newSection);
    }
    
    // Regular section creation logic
    const newSection = {
      _id: crypto.randomBytes(12).toString('hex'),
      name,
      slug,
      description,
      category,
      isFolder: isFolder || false,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Creating new section:', newSection);
    res.status(201).json(newSection);
  } catch (error) {
    console.error('Error in section creation:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to create section',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Content endpoint
router.post('/content', (req, res) => {
  try {
    const { section, slug, title, subtitle, images, fields, isActive } = req.body;
    console.log('Creating content:', { section, title, slug });
    
    // Process images to include prompt if present
    const processedImages = images.map(image => ({
      ...image,
      prompt: image.prompt || null, // Include prompt if it exists
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    const newContent = {
      _id: crypto.randomBytes(12).toString('hex'),
      section,
      slug,
      title,
      subtitle,
      images: processedImages,
      fields,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Content created:', newContent);
    res.status(201).json(newContent);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
});

module.exports = router; 