const asyncHandler = require('express-async-handler')
const Pet = require("../models/pet");
const Category = require("../models/category");
const Item = require("../models/item");

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