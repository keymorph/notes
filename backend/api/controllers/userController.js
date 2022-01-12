import validateInput from '../middleware/validateInput.js'
import userService from '../services/userService.js'

// Hey... Give me a email, and a password
// Information to Register
// ----
// 1. Validate the Input (make sure it's even an email address to begin with)
// 2. I'm going to search the database for that email
// If that email exists then reject.



const register = async (req, res) => {
    console.log("----------------- REGISTER USER API")
    const { email, password } = req.body
    try {
        console.log("BEFORE INPUT")
        const inputResult = await validateInput.email(email, password, res)
        const searchResult = await userService.search(email, res)
        console.log("result")
        if (searchResult === true) {
            const registerResult = await userService.register(email, password, res)
        }
        
    } catch (error) {
        res.status(400).json({ error })
    }
}

const login = (req, res) => {
    try {
        const { email, password } = req.body
        console.log("CHICKEN?")
        console.log(email)
        validateInput.email(email, password, res)
        userService.login(email, password, res)
    } catch (error) {
        console.log(error)
    }
}

const remove = async (req, res) => { userService.remove(req, res) }

const userController = { register, login, remove }
export default userController