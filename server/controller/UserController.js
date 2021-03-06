const { signPayload } = require('../helpers/jwt')
const { verifyPassword } = require('../helpers/password')
const { User } = require('../models')

class UserController{
    static async login(req, res, next){
        try{
            const { email, password } = req.body

            if(!email || !password){
                throw { message : 'Bad Request', statusCode : 400 }
            }

            const user = await User.findOne({
                where : {
                    email
                }
            })
            
            if(user){
                const passwordCorrect = verifyPassword(password, user.password)
    
                if(!passwordCorrect){
                    res.status(401).json({message : 'Email/Password combination not found!'})
                    return
                }
    
                const access_token = signPayload({ id : user.id, email : user.email })
                res.status(200).json({
                    id : user.id,
                    email : user.email,
                    access_token
                })
            } else {
                res.status(401).json({message : 'Email/Password combination not found!'})
            }
        } catch (e){
            next(e)
        }
    }
}


module.exports = UserController
