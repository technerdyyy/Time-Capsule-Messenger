const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken')
const UserModel = require('../models/UserModel')

async function updateUserDetails(request,response){
    try {
        const token = request.cookies.token || ""

        const user = await getUserDetailsFromToken(token)

       const { name } = request.body
       
       const updateUser = await UserModel.updateOne( {
          name
       })

     

     return response.json({
        message : "user updated successfully",
        data : userInformation,
        success : true
     })

    } catch (error) {
       return response.status(500).json({
        message : error.message || error,
        error : true
       }) 
    }
}

module.exports = updateUserDetails