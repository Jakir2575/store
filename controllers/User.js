const User = require("../models/User")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")



///// signup api logic

// const registerUser = async(req, res) => {
//     const {name, email, password} = req.body
//     const userExist = await User.findOne({email});

//     if(userExist){
//         returnvres.status(400).json({message: "user is already exist"})
//     };

//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//         name,
//         email,
//         password: hashedPassword,
//     })

//     if(user){
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             token: generateToken(user._id)
//         })
//     }else{
//         res.status(404).json({message: "invalid user data"})
//     }
// }

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Request received: ", { name, email, password });

    try {
        const userExist = await User.findOne({ email });
        console.log("User existence check: ", userExist);

        if (userExist) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Password hashed successfully");

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        console.log("User created: ", user);

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            console.log("Invalid user data");
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error occurred: ", error.message);
        res.status(500).json({ message: error.message });
    }
};



///// login api logic


const authUser = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(404).json({message: "invalid email or password"})
    }
}



///// getUserById


const getUserProfile = async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }else{
        res.status(404).json({message: "user not found"})
    }
}

module.exports = {registerUser, authUser, getUserProfile}


