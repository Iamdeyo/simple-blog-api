import responseBody from "../utils/responseBody.js";

// @desc a user
// route GET user/me
// @access private
const me = async (req, res) => {
  return responseBody(res, 200, true, "Current User Profile Found", req.user);
};

export { me };
