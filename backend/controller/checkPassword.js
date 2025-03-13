const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs') 
const jwt = require('jsonwebtoken')

async function checkPassword(request, response){
    try {
      const { password, userId } = request.body
       console.log("Received Data:", request.body);
       
       const user = await UserModel.findById(userId)

       const verifyPassword = await bcryptjs.compare(password,user.password) 

       if(!verifyPassword){
        return response.status(400).json({
          message : "Please check password",
          error : true 
        })
       }

       const tokenData = {
        id : user._id,
        email : user.email 
       }

      const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{ expiresIn : '1d'})

      const cookieOptions = {
        http : true,
        secure : true
      }

       return response.cookie('token',token,cookieOptions).status(200).json({
        message : "Login successfully",
        token : token,
        success : true 
       }) 

    } catch (error) {
      return response.status(500).json({
        message : error.message || error,
        error : true 
      })
    }
}

module.exports = checkPassword  


// const jwt = require("jsonwebtoken");
// const User = require("../models/UserModel");
// const bcrypt = require("bcryptjs");

// const checkPassword = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // Generate JWT Token
//     const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

//     res.json({ token, email: user.email, id: user._id }); // Return user ID along with email
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// Reusable Authentication Middleware
// const authenticateUser = (req, res, next) => {
//   const authHeader = req.header("Authorization");

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(403).json({ error: "Unauthorized" });
//   }

//   try {
//     const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.userEmail = decoded.email;
//     req.userId = decoded.id; // Store user ID if needed

//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// // module.exports = { checkPassword, authenticateUser };

// module.exports.checkPassword = checkPassword;
// module.exports.authenticateUser = authenticateUser;


