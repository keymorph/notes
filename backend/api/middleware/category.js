import database from '../models/database.js'

const create = (req, res, next) => {

    /*

    {
        category: Work,
        color: red
    }

    EDITING A NOTE
    ----------------
    currentNote === categoryName and color
    changes ======= newValueCategory and newValueColor


    if (currentNote.categoryName === {newValueCategory}) {
        if (currentNote.color === {newValueColor}) {
            // pass values don't create
        } else {
            // not the same color, new color
            UPDATE category's newValueColor and return back the categoryID
        }
    } else {
        // not the same name
        if (newValueCategory exists) {
            {CHECKING THE CATEGORY ARRAY}
            continue on with editing and ++
            categoryID
            UPDATE the note with newValueCategory and newValueColor

        } else {
            // category doesn't exist
            CREATE newValueCategory with newValueColor
        }
    }

    Existing:
        {
            category: Homework,
            color: red
        }

    Changed:
        {
            category: Homework,
            color: blue
        }
    // ------- UPDATE note create

    Changed:
        {
            category: Work,
            color: red
        }
    // ------- CREATE

    Changed:
        {
        }
    // ------- UPDATE note create

    */

    if (req.body.category === '') { 
        console.log("empty category")
        req.body.category = null; 
    }

    if (req.body.category != null) {
        console.log("CATEGORY", req.body.category)
        database.query(
            `INSERT INTO categories (category, color, userID) VALUES ('${req.body.category}', '${req.body.color}', '${req.userID}');`,
            async (err, results) => {
                if (err) throw err;
                // const userID = res.locals.userID;
                // console.log("BOOM" + userID)
                // // next();
                // console.log(results)
                // return res.status(200).json(results)

                // res.locals.categoryID = results.insertId;
                // console.log(res.locals.categoryID)

                req.categoryID = results.insertId;
                console.log("CATEGORY ID", req.categoryID)
                next();
            }
        )
    } else {
        req.categoryID = 0;
        next();
    }
}

const get = (req, res, next) => {
    database.query(
        `SELECT * FROM categories WHERE userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err
            req.categories = results;
            console.log(req.categories)
            next();
        })
}

const category = { create, get }
export default category