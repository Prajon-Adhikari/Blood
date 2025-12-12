import Donor from "../models/donor.model.js";

export const addDonor = async (req, res) => {
  try {
    const { streetNo, name, age, gender, bloodGroup, contact, disease } =
      req.body;

    const { id: userId } = req.user;

    console.log(userId);

    // Basic validation
    if (!streetNo || !name || !age || !gender || !bloodGroup || !contact) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const newDonor = new Donor({
      streetNo,
      name,
      age,
      gender,
      bloodGroup,
      contact,
      disease: disease || "None",
      userId,
    });

    const savedDonor = await newDonor.save();

    res
      .status(201)
      .json({ message: "Donor added successfully", donor: savedDonor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().populate("userId", "fullName email");
    res.status(200).json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyDonor = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const donors = await Donor.find({ userId }).populate(
      "userId",
      "fullName email"
    );
    res.status(200).json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateDonor = async (req, res) => {
  try {
    const donorId = req.params.id;
    const updatedDonor = await Donor.findByIdAndUpdate(donorId, req.body, {
      new: true,
    });
    if (!updatedDonor)
      return res.status(404).json({ message: "Donor not found" });
    res.status(200).json({ message: "Donor updated", donor: updatedDonor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteDonor = async (req, res) => {
  try {
    const donorId = req.params.id;
    const deletedDonor = await Donor.findByIdAndDelete(donorId);

    if (!deletedDonor)
      return res.status(404).json({ message: "Donor not found" });

    res
      .status(200)
      .json({ message: "Donor deleted successfully", donor: deletedDonor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
