const asyncHandler = require('express-async-handler')
const Pet = require("../models/pet");


// Display list of all Pets.
exports.pet_list = asyncHandler(async (req, res, next) => {
  try {
    const allPets = await Pet.find({}).sort({ name: 1 }).exec();
    console.log(allPets);
    res.render("pet_list", {
        title: "Pet List",
        pet_list: allPets
    });
} catch (err) {
    console.error(err);
    // Handle the error appropriately
}
});

// Handle Pet delete on POST.
exports.pet_delete_post = asyncHandler(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id).exec();
  if (!pet) {
    const err = new Error('Pet not found');
    err.status = 404;
    throw err;
  }

  await Pet.findByIdAndDelete(req.params.id).exec();
  res.redirect("/catalog/pets");
});

// Handle Pet update GET
exports.pet_update_get = asyncHandler(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id).exec();
  console.log(pet)
  if (!pet) {
    const err = new Error('Pet not found');
    err.status = 404;
    throw err;
  }

  res.render("pet_update", {
    pet_info: pet
});
})

// Handle Pet update POST
exports.pet_update_post = asyncHandler(async (req, res, next) => {
    const pet = await Pet.findById(req.params.id).exec();
    if (!pet) {
      const err = new Error('Pet not found');
      err.status = 404;
      throw err;
    }
  
    // Update the pet's name
    pet.name = req.body.pet_name;
    await pet.save();
  
    res.redirect("/catalog/pets");
})



// Handle Pet create new Get
exports.pet_new_get = asyncHandler(async (req, res, next) => {
  res.render("pet_new");
})

// Handle Pet create new POST
exports.pet_new_post = asyncHandler(async (req, res, next) => {
  // Validate the request body
  if (!req.body.name) {
    return res.status(400).send("Name is required");
  }

  // Create a new pet object
  const newPet = new Pet({
    name: req.body.name
  });

  try {
    // Save the new pet
    await newPet.save();
    res.redirect("/catalog/pets");
  } catch (err) {
    // Handle any errors that occur during save
    console.error(err);
    return res.status(500).send("An error occurred while saving the pet");
  }
})