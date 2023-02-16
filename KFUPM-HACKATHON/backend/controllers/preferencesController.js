const asyncHandler = require("express-async-handler");

const Preferences = require("../models/prefrencesModel");
const User = require("../models/userModel");

// @desc    Get Preferences
// @route   GET /api/preferences
// @access  Private
const getPreferences = asyncHandler(async (req, res) => {
  //req.user.id is accesed after autherization thru authMiddleware
  const preferences = await Preferences.find({ user: req.user.id });

  res.status(200).json(preferences);
});

const getAllPreferences = asyncHandler(async (req, res) => {
  const preferences = await Preferences.find();
  if (!preferences) {
    res.status(400);
    throw new Error("Error while fetching all preferences");
  }
  res.status(200).json(preferences);
});

// @desc    create Preferences
// @route   POST /api/preferences
// @access  Private
const createPreferences = asyncHandler(async (req, res) => {
  const { name, weight, type, recEmail, width, height, insurance } = req.body;

  if (
    !name ||
    !weight ||
    !type ||
    !recEmail ||
    !width ||
    !height ||
    !insurance
  ) {
    res.status(400);
    throw new Error("Please add all text fields");
  }

  User.findOne({ email: recEmail }, async function (err, reciver) {
    if (err) {
      res.status(400);
    } else {
      if (reciver === null) {
        res.status(400);
        res.json({ message: "User not found or Email is wrong" });
      } else {
        //req.user.id is accesed after autherization thru authMiddleware
        console.log(req.user.email);
        randomStatus = createRandomState();
        const senderPackage = await new Package({
          user: req.user.id,
          name: req.body.name,
          weight: req.body.weight,
          type: req.body.type,
          width: req.body.width,
          height: req.body.height,
          insurance: req.body.insurance,
          recEmail: req.body.recEmail,
          sendEmail: req.user.email,
          flagStatus: "Sent",
          status: randomStatus,
          cost: calculateCost(
            req.body.type,
            req.body.weight,
            req.body.width,
            req.body.height,
            req.body.insurance
          ).toFixed(2),
        });

        const recieverPackage = await new Package({
          user: reciver._id,
          name: req.body.name,
          weight: req.body.weight,
          type: req.body.type,
          width: req.body.width,
          height: req.body.height,
          insurance: req.body.insurance,
          sendEmail: req.user.email,
          recEmail: req.body.recEmail,
          flagStatus: "Received",
          status: randomStatus,
          cost: calculateCost(
            req.body.type,
            req.body.weight,
            req.body.width,
            req.body.height,
            req.body.insurance
          ).toFixed(2),
        });

        randomLocationsArray = createRandomLocation(randomStatus);
        senderPackage.locations = randomLocationsArray;
        senderPackage.save();
        recieverPackage.locations = randomLocationsArray;
        recieverPackage.save();

        // res.status(200).json(senderPackage);
        res.status(200).json(recieverPackage);
      }
    }
  });
});

// @desc    update Package
// @route   PUT /api/package/:id
// @access  Private
const updatePackage = asyncHandler(async (req, res) => {
  const package = await Package.findById(req.params.id);

  if (!package) {
    res.status(400);
    throw new Error("Package not found");
  }

  const updatedPackage = await Package.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedPackage);
});

// @desc    Delete Package
// @route   GET /api/package/:id
// @access  Private
const deletePackage = asyncHandler(async (req, res) => {
  const package = await Package.findById(req.params.id);

  if (!package) {
    res.status(400);
    throw new Error("Package not found");
  }
  await Package.deleteMany({
    name: package.name,
    type: package.type,
    weight: package.weight,
    width: package.width,
    height: package.height,
    cost: package.cost,
  });

  // const user = await User.findById(req.user.id);

  // if (!user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }
  // //Make sure the logged in user matches the package user
  // if (package.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  // await package.remove();
  // await recPackage.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getAllPackages,
};
