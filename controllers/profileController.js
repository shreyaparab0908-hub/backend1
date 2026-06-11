const Profile = require("../models/Profile");

exports.createProfile = async (req, res) => {
  try {
    const { name, rollNumber, class: studentClass, department, teacher, phoneNumber } = req.body;

    if (!name || !rollNumber || !studentClass || !department || !teacher || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All profile fields are required.",
        data: null,
      });
    }

    const existingProfile = await Profile.findOne({ rollNumber });
    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message: "A profile with this roll number already exists.",
        data: null,
      });
    }

    const profile = await Profile.create({
      name,
      rollNumber,
      class: studentClass,
      department,
      teacher,
      phoneNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully.",
      data: profile,
    });
  } catch (error) {
    console.error("Create profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating profile.",
      data: null,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { rollNumber } = req.query;
    let data;

    if (rollNumber) {
      data = await Profile.findOne({ rollNumber });
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Profile not found.",
          data: null,
        });
      }
    } else {
      data = await Profile.find();
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      data,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile.",
      data: null,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { rollNumber } = req.query;
    if (!rollNumber) {
      return res.status(400).json({
        success: false,
        message: "rollNumber query parameter is required.",
        data: null,
      });
    }

    const updateData = { ...req.body };
    if (updateData.rollNumber && updateData.rollNumber !== rollNumber) {
      const existingProfile = await Profile.findOne({ rollNumber: updateData.rollNumber });
      if (existingProfile) {
        return res.status(409).json({
          success: false,
          message: "The new roll number is already in use.",
          data: null,
        });
      }
    }

    const profile = await Profile.findOneAndUpdate(
      { rollNumber },
      updateData,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: profile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile.",
      data: null,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { rollNumber } = req.query;
    if (!rollNumber) {
      return res.status(400).json({
        success: false,
        message: "rollNumber query parameter is required.",
        data: null,
      });
    }

    const profile = await Profile.findOneAndDelete({ rollNumber });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully.",
      data: profile,
    });
  } catch (error) {
    console.error("Delete profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting profile.",
      data: null,
    });
  }
};
