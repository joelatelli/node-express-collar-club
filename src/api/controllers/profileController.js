const { successResponse } = require('../../utils/apiResponse');
const asyncWrapper = require('../../middlewares/asyncHandler');
const { profileService } = require('../services');

const createProfile = asyncWrapper(async (req, res, next) => {
    const profile = await profileService.createNewProfile(req.body);
    return successResponse(res, statusCode.CREATED, profile, 'Profile Created Successfully');
});

const getProfiles = asyncWrapper(async (req, res, next) => {
  const profiles = await profileService.getProfiles(req.query);
  return successResponse(res, 200, profiles, 'Profiles Retrieved Successfully');
});

const getProfile = asyncWrapper(async (req, res, next) => {
  const { profileId } = req.params;
  const profile = await profileService.getProfile(profileId);
  return successResponse(res, 200, profile, 'Profile Retrieved Successfully');
});

const updateProfile = asyncWrapper(async (req, res, next) => {
  const { profileId } = req.params;
  const profile = await profileService.updateProfile(profileId, req.body);
  return successResponse(res, 200, profile, 'Profile Updated Successfully');
});

const deleteProfile = asyncWrapper(async (req, res, next) => {
  const { profileId } = req.params;
  await profileService.deleteProfile(profileId);
  return successResponse(res, 200, null, 'Profile Deleted Successfully');
});

module.exports = {
  createProfile,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
};