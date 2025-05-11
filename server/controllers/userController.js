// //controller/userController.js
// import userModel from "../model/userModel.js";

// export const getUserData = async (req, res) => {
//     try {
//         const {userId} = req.body;

//         const user = await userModel.findById(userId);

//         if(!user){
//             return res.json({ success: false, message: 'User not found' });
//         }

//         res.json({
//             success: true,
//             userData: {
//                 name: user.name,
//                 isAccountVerified: user.isAccountVerified,
//             }
//         });
//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
    
// }
import userModel from "../model/userModel.js";

export const getUserData = async (req, res) => {
    console.log('------ getUserData Start ------');
    console.log('Request body received:', req.body);
    
    try {
        const { userId } = req.body;
        console.log('Looking up user with ID:', userId);
        
        if (!userId) {
            console.log('No userId provided in request body');
            return res.json({
                success: false,
                message: 'User ID not provided'
            });
        }
        
        // Find user by ID (extracted from JWT token by middleware)
        const user = await userModel.findById(userId);
        console.log('Database lookup result:', user ? 'User found' : 'User not found');
        
        if (!user) {
            return res.json({ 
                success: false, 
                message: 'User not found',
                debug: { userId, lookupFailed: true }
            });
        }
        
        // Return user data
        const userData = {
            userId: user._id,
            name: user.name,
            email: user.email
        };
        
        console.log('Sending user data back to client:', userData);
        return res.json({
            success: true,
            userData
        });
    } catch (error) {
        console.log('Error in getUserData:', error.message);
        return res.json({ 
            success: false, 
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    } finally {
        console.log('------ getUserData End ------');
    }
};
            



export const updateUserData = async (req, res) => {
    try {
        const { userId, name, email } = req.body;
        
        // Find and update user
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true } // Return updated document
        );
        
        if (!updatedUser) {
            return res.json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        return res.json({
            success: true,
            message: 'Profile updated successfully',
            userData: {
                userId: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            }
        });
    } catch (error) {
        return res.json({ 
            success: false, 
            message: error.message 
        });
    }
};