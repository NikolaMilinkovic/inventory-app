const asyncHandler = require('express-async-handler')
const Category = require("../models/category");

// Display list of all categorys.
exports.category_list = asyncHandler(async (req, res, next) => {
    try {
      const allCategories = await Category.find({}).sort({ name: 1 }).exec();
      res.render("category_list", {
          title: "Categories:",
          category_list: allCategories
      });
  } catch (err) {
      console.error(err);
      // Handle the error appropriately
  }
  });
  
  // Handle category delete on POST.
  exports.category_delete_post = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    if (!category) {
      const err = new Error('category not found');
      err.status = 404;
      throw err;
    }
  
    await Category.findByIdAndDelete(req.params.id).exec();
    res.redirect("/catalog/categories");
  });
  
  // Handle category update GET
  exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    console.log(category)
    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      throw err;
    }
  
    res.render("category_update", {
      category_info: category
  });
  })

  
  // Handle category update POST
  exports.category_update_post = asyncHandler(async (req, res, next) => {
      const category = await Category.findById(req.params.id).exec();
      if (!category) {
        const err = new Error('category not found');
        err.status = 404;
        throw err;
      }
    
      // Update the category's name
      category.name = req.body.category_name;
      await category.save();
    
      res.redirect("/catalog/categories");
  })
  
  
  
  // Handle category create new Get
  exports.category_new_get = asyncHandler(async (req, res, next) => {
    res.render("category_new");
  })
  
  // Handle category create new POST
  exports.category_new_post = asyncHandler(async (req, res, next) => {
    // Validate the request body
    if (!req.body.name) {
      return res.status(400).send("Name is required");
    }
  
    // Create a new category object
    const newcategory = new Category({
      name: req.body.name
    });
  
    try {
      // Save the new category
      await newcategory.save();
      res.redirect("/catalog/categories");
    } catch (err) {
      // Handle any errors that occur during save
      console.error(err);
      return res.status(500).send("An error occurred while saving the category");
    }
  })