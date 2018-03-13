const mongoose = require("mongoose");
const Asset = mongoose.model("Asset");
const Brand = mongoose.model("Brand");
const AssetType = mongoose.model("AssetType");
const Status = mongoose.model("Status");
const Location = mongoose.model("Location");
const Branch = mongoose.model("Branch");

module.exports = app => {
  app.post("/api/saveform", async (req, res) => {
    const {
      brand,
      assetType,
      model,
      serial,
      status,
      assignedTo,
      comment,
      greenTag,
      branch,
      location
    } = req.body;
    const asset = new Asset({
      brand,
      assetType,
      model,
      serial,
      status,
      assignedTo,
      comment,
      greenTag,
      branch,
      location
    });
    const newAsset = await asset.save();

    res.send({ newAsset });
  });

  app.post("/api/getassets", async (req, res) => {
    const count = await Asset.count();
    const assets = await Asset.find();
    // .skip(req.body.pageSize * (req.body.pageNo - 1))
    // .limit(req.body.pageSize);

    res.send({ assets, count });
  });

  app.post("/api/editasset", async (req, res) => {
    const {
      brand,
      assetType,
      model,
      serial,
      status,
      assignedTo,
      comment,
      id,
      greenTag,
      branch,
      location
    } = req.body;
    const asset = {
      brand,
      assetType,
      model,
      serial,
      status,
      assignedTo,
      comment,
      greenTag,
      branch,
      location
    };
    const updatedAsset = await Asset.findByIdAndUpdate(
      id,
      { $set: asset },
      { new: true }
    );

    res.send({ updatedAsset });
  });

  app.post("/api/deleteasset", async (req, res) => {
    const id = req.body.assetId;
    const deletedAsset = await Asset.findByIdAndRemove(id);

    if (!deletedAsset) {
      return res.status(404).send("No asset found");
    }
    return res.status(200).send("Deleted Succesfully");
  });

  app.post("/api/savebrand", async (req, res) => {
    const brand = req.body.brand;
    if (!brand) {
      res.status(404).send("No brand was provided");
    }
    const nbrand = new Brand({ brand });
    const savedBrand = await nbrand.save();
    res.status(200).send({ savedBrand });
  });

  app.post("/api/savetype", async (req, res) => {
    const assetType = req.body.assetType;
    if (!assetType) {
      res.status(404).send("No type was provided");
    }
    const nassetType = new AssetType({ assetType });
    const saveType = await nassetType.save();
    res.status(200).send({ saveType });
  });
  app.post("/api/savestatus", async (req, res) => {
    const status = req.body.status;

    if (!status) {
      res.status(404).send("No status was provided");
    }

    const nstatus = new Status({ status });
    const saveStatus = await nstatus.save();
    res.status(200).send({ saveStatus });
  });
  app.post("/api/savebranch", async (req, res) => {
    const branch = req.body.branch;

    if (!branch) {
      res.status(404).send("No branch was provided");
    }

    const nbranch = new Branch({ branch });
    const saveBranch = await nbranch.save();
    res.status(200).send({ saveBranch });
  });
  app.get("/api/fetchformdata", async (req, res) => {
    const branches = await Branch.find({});
    const brands = await Brand.find({});
    const assetTypes = await AssetType.find({});
    const statuses = await Status.find({});
    const locations = await Location.find({});
    const formData = {
      branches,
      brands,
      assetTypes,
      statuses,
      locations
    };
    res.send(formData);
  });
  app.post("/api/savelocation", async (req, res) => {
    const location = req.body.location;

    if (!location) {
      res.status(404).send("No location was provided");
    }

    const nlocation = new Location({ location });
    const saveLocation = await nlocation.save();
    res.status(200).send({ saveLocation });
  });

  app.post("/api/searchTerm", async (req, res) => {
    const { searchTerm } = req.body;
    const assets = await Asset.aggregate(
      [
        {
          $match: {
            assignedTo: { $regex: searchTerm, $options: "i" }
          }
        },
        { $unwind: "$assignedTo" },
        {
          $match: {
            assignedTo: { $regex: searchTerm, $options: "i" }
          }
        },
        {
          $group: {
            _id: "$_id",
            brand: { $first: "$brand" },
            model: { $first: "$model" },
            assetType: { $first: "$assetType" },
            serial: { $first: "$serial" },
            status: { $first: "$status" },
            assignedTo: { $first: "$assignedTo" },
            comment: { $first: "$comment" },
            greenTag: { $first: "$greenTag" },
            location: { $first: "$location" },
            branch: { $first: "$branch" }
          }
        }
      ],
      function (err, results) { }
    );
    res.send(assets);
  });
};
