export const getProfile = async(req,res) => {
  const { password, ...userWithoutPassword } = req.user;

  return res.status(200).json({
    user: userWithoutPassword,
  });
};