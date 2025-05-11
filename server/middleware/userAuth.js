// import jwt from 'jsonwebtoken';


// const userAuth = async (req, res, next) => {
//     const {token} = req.cookies;

//     if(!token){
//         return res.json({success: false, message: 'Not Authorized login again'})
//     }
//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//         if(tokenDecode.id){
//             req.body.userId = tokenDecode.id
//         }else{
//             return res.json({success: false, message: 'Not Authorized login again'})
//         }       

//         next();
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
//     }
    
// export default userAuth
import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    console.log('------ Auth Middleware Start ------');
    console.log('Cookies received:', req.cookies);
    
    const { token } = req.cookies;

    if (!token) {
        console.log('No token found in cookies');
        return res.json({ success: false, message: 'Not Authorized login again' });
    }
    
    console.log('Token found in cookies');
    
    try {
        console.log('Attempting to verify token...');
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified, decoded data:', tokenDecode);

        if (tokenDecode.id) {
            console.log('User ID found in token:', tokenDecode.id);
            req.body.userId = tokenDecode.id;
            console.log('Added userId to req.body:', req.body);
            next();
        } else {
            console.log('No user ID found in token');
            return res.json({ success: false, message: 'Not Authorized login again' });
        }
    } catch (error) {
        console.log('Token verification error:', error.message);
        res.json({ success: false, message: error.message });
    }
    console.log('------ Auth Middleware End ------');
};

export default userAuth;