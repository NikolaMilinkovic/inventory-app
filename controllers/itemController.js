const asyncHandler = require('express-async-handler')
const Pet = require("../models/pet");
const Category = require("../models/category");
const Item = require("../models/item");
const User = require('../models/user')

exports.item_list = asyncHandler(async (req, res, next) => {
    

    try {
        const allItems = await Item.find()
            .populate('for') // Populate the 'for' field with the corresponding 'Pet' documents
            .populate('category') // Populate the 'category' field with the corresponding 'Category' documents
            .sort({ name: 1 })
            .exec();
        res.render("item_list", {
            title: "All Items:",
            item_list: allItems
        });
    } catch (err) {
        console.error(err);
        // Handle the error appropriately
    }
})

// Handle Item create new Get
exports.item_new_get = asyncHandler(async (req, res, next) => {
const [allItems, allPets, allCategories] = await Promise.all([
    Item.find().sort({ name: 1 }).exec(),
    Pet.find().sort({ name: 1 }).exec(),
    Category.find().sort({ name: 1 }).exec(),
    ]);

    res.render("item_new", {
    title: "Create New Item",
    items: allItems,
    pets: allPets,
    categories: allCategories
    })

res.render("item_new");
})

// Handle Item create new POST
exports.item_new_post = asyncHandler(async (req, res, next) => {
// Validate the request body
if (!req.body.name) {
    return res.status(400).send("Name is required");
}

// Create a new item object
const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
    for: Array.isArray(req.body.for) ? req.body.for : [req.body.for],
    category: Array.isArray(req.body.category) ? req.body.category : [req.body.category]
});

try {
    // Save the new category
    await newItem.save();
    res.redirect("/catalog/items");
} catch (err) {
    // Handle any errors that occur during save
    console.error(err);
    return res.status(500).send("An error occurred while saving the category");
}
})


  // Handle Item update GET
  exports.item_update_get = asyncHandler(async (req, res, next) => {
    const passwordInput = req.query.password;
    const [item, pets, categories, users ] = await Promise.all([
        Item.findById(req.params.id).exec(),
        Pet.find().sort({name: 1}).exec(),
        Category.find().sort({name: 1}).exec(),
        User.find({}, 'password').exec()
    ]);
    const password = users.map(user => user.password);
    // Check for password match
    if(!password.includes(passwordInput)){
        return res.redirect("/catalog/items");
  }

    if (!item) {
      const err = new Error('Item not found');
      err.status = 404;
      throw err;
    }

     // Mark our selected genres as checked.
    pets.forEach((pet) => {
        if (item.for.includes(pet._id)) pet.checked = "true";
    });
    // Mark our selected genres as checked.
    categories.forEach((category) => {
        if (item.category.includes(category._id)) category.checked = "true";
    });
  
    res.render("item_update", {
      item_info: item,
      pet_info: pets,
      category_info: categories
  });
  })

  // Handle Item update POST
  exports.item_update_post = asyncHandler(async (req, res, next) => {
      const item = await Item.findById(req.params.id).exec();
      if (!item) {
        const err = new Error('Item not found');
        err.status = 404;
        throw err;
      }

    // Convert the for checkbox inputs to an array.
    if (!Array.isArray(req.body.for)) {
        req.body.for = typeof req.body.for === "undefined" ? [] : [req.body.for];
    }

    // Convert the category checkbox inputs to an array.
    if (!Array.isArray(req.body.category)) {
        req.body.category = typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    
      // Update the category's name
      item.name = req.body.item_name;
      item.description = req.body.item_description;
      item.price = req.body.item_price;
      item.inStock = req.body.item_inStock;
      item.for = req.body.for;
      item.category = req.body.category;
      await item.save();
    
      res.redirect("/catalog/items");
  })


// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
    const passwordInput = req.body.password;
    console.log(passwordInput);
    const [item, users]= await Promise.all([
        Item.findById(req.params.id).exec(),
        User.find({}, 'password').exec()
    ]);

    const password = users.map(user => user.password);
    console.log(password);
    // Check for password match
    if(!password.includes(passwordInput)){
        return res.redirect("/catalog/items");
    }
    if (!item) {
        const err = new Error('Item not found');
        err.status = 404;
        throw err;
    }
    
    await Item.findByIdAndDelete(req.params.id).exec();
    res.redirect("/catalog/items");
    });