const express = require('express');
const router = express.Router();

// Controller modules
const pet_controller = require('../controllers/petController');
const category_controller = require('../controllers/categoryController');
const item_controller = require('../controllers/itemController');


/* GET catalog listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//===============================[PET ROUTES]===============================//
// Renders all pets
router.get('/pets', pet_controller.pet_list);

// Pet detele button
router.post('/pet/:id/delete', pet_controller.pet_delete_post);

// Pet update
router.get('/pet/:id/update', pet_controller.pet_update_get);
router.post('/pet/:id/update', pet_controller.pet_update_post);

// Create new pet
router.get('/pets/new-pet', pet_controller.pet_new_get);
router.post('/pets/new-pet', pet_controller.pet_new_post);

//===============================[\PET ROUTES]===============================//



//===============================[CATEGORY ROUTES]===============================//
// Renders all categories
router.get('/categories', category_controller.category_list);

// Category delete button
router.post('/category/:id/delete', category_controller.category_delete_post);

// Category update
router.get('/category/:id/update', category_controller.category_update_get);
router.post('/category/:id/update', category_controller.category_update_post);

// Create new category
router.get('/categories/new-category', category_controller.category_new_get);
router.post('/categories/new-category', category_controller.category_new_post);

//===============================[\CATEGORY ROUTES]===============================//



//===============================[ITEM ROUTES]===============================//
// Renders all categories
router.get('/items', item_controller.item_list);

// // Category delete button
// router.post('/category/:id/delete', category_controller.category_delete_post);

// // Category update
// router.get('/category/:id/update', category_controller.category_update_get);
// router.post('/category/:id/update', category_controller.category_update_post);

// // Create new category
router.get('/items/new-item', item_controller.item_new_get);
router.post('/items/new-item', item_controller.item_new_post);

//===============================[\ITEM ROUTES]===============================//

module.exports = router;
