import  jwt from "jsonwebtoken";

const genrateTocken=(res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '30d',
    });

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODEENV!=='Dev',
        sameSite:'strict',
        maxAge:30*24*60*60*1000
    })

}

export default genrateTocken;