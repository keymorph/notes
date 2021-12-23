function createScripterValidation (req) {
    let data = [
        req.body.firstName, 
        req.body.lastName, 
        req.body.study, 
        req.body.github
        ]
    
        // Validating User Input
        for (let obj of data) {
            if (obj.match(/Dramon|richard/gi)) {
                return false;
            }
            console.log(obj);
        }
        return true;
}

module.exports = {createScripterValidation}