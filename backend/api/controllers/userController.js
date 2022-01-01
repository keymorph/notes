import validateInput from '../middleware/validateInput.js'
import userService from '../services/userService.js'

const register = async (req, res) => {
    console.log("----------------- REGISTER USER API")
    const { email, password } = req.body
    try {
        console.log("BEFORE INPUT")
        const inputResult = await validateInput.email(email, password, res)
        const searchResult = await userService.search(email, res)
        const registerResult = await userService.register(email, password, res)
        
    } catch (error) {
        console.log("LOLOL???????????????")
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        validateInput.email(email, password, res)
        userService.login(email, password, res)
    } catch (error) {
        console.log(error)
    }
}

const remove = async (req, res) => { userService.remove(req, res) }

const userController = { register, login, remove }
export default userController