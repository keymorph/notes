const email = (email, password, res) => {
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: 'Empty field in form input.' })
    }

    if (email.length < 5 || email.length > 50 || !email.includes('@')) {
        return res
            .status(400)
            .json({ error: 'Invalid email address.' })
    }

    if (password.length < 6 || password.length > 40) {
        console.error('Password sizing error.')
        return res
            .status(400)
            .json({ error: 'Password must be between 6 and 40 characters.' })
    }

    return true;
}

const validateInput = { email }
export default validateInput
