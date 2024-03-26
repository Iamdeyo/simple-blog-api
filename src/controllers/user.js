import responseBody from "../utils/responseBody.js";

// @desc a user
// route GET user/me
// @access private
const me = async (req, res) => {
  console.log(req.user);
  return responseBody(res, 200, true, "Current User Profile Found");
};

export { me };
