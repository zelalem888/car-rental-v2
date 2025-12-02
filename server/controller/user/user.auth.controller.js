const { userAuthService, userRegisterService,userVerifyService } = require("../../service/user/user.auth.service");

exports.userAuthController = async (req, res) => {
  try {
    const browser =  req.headers["user-agent"];
    const rows = await userAuthService(req.body, browser);
    console.log(rows)
    if (rows.rows.length > 0) {
    
      // console.log(rows)
      return res.status(200).json(rows.token);
    } else {
      return res.status(401).json("Invalid email or password.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
// ==============================================================

exports.userVerifyController = async(req, res)=>{
 try {
    const result = await userVerifyService(req.headers["jwt-token"])
    
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message)
  }
}

// ==============================================================

exports.userRegisterController = async (req, res) => {
  try {
    const browser =  req.headers["user-agent"];
    const result = await userRegisterService(req.body, browser)
    
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};
