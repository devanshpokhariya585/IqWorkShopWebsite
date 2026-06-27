import TrialRequest from '../models/TrialRequest.js'

export const createTrialRequest = async (req, res, next) => {
  try {
    const { companyName, userType, storageNeeded, usersAllowed, transferLimit } = req.body

    if (!companyName || !userType || !storageNeeded || !usersAllowed || !transferLimit) {
      return res.status(400).json({
        message: 'Company name, type of user, storage, users allowed, and transfer limit are required',
      })
    }

    const trialRequest = await TrialRequest.create({
      user: req.user._id,
      companyName,
      userType,
      storageNeeded,
      usersAllowed,
      transferLimit,
    })

    res.status(201).json({
      message: 'Trial request saved successfully',
      trialRequest,
    })
  } catch (error) {
    next(error)
  }
}
