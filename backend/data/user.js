import bcrypt from 'bcrypt'

const users=[
    {
        name:"admin",
        email:"admin@gmail.com",
        password:bcrypt.hashSync("12346",10),
        isAdmin:true
    },
    {
        name:"ajay",
        email:"ajay@gmail.com",
        password:bcrypt.hashSync("12346",10),
        isAdmin:false
    },
    {
        name:"vijay",
        email:"vijay@gmail.com",
        password:bcrypt.hashSync("12346",10),
        isAdmin:false
    },
]

export default users;