export const uploadResume = async(req , res) => {
console.log("User:");
  console.log(req.user);

  console.log("File:");
  console.log(req.file);

  return res.status(200).json({
    message: "Resume received successfully",
  });

};