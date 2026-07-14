export const getProfile = async(req,res) => {
  return res.status(200).json({
    user : req.user,
  });
};