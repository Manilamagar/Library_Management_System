const jwt = require('jsonwebtoken');
const config = require('../config/db'); // You'll need to create this

const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            
            if (!token) {
                return res.status(403).json({ message: 'No token provided' });
            }

            jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }

                req.userId = decoded.id;
                
                if (!allowedRoles.includes(decoded.role)) {
                    return res.status(403).json({ 
                        message: 'Insufficient role permissions' 
                    });
                }

                next();
            });

        } catch (error) {
            return res.status(500).json({ 
                message: 'Error verifying role',
                error: error.message 
            });
        }
    };
};

// Usage examples
const isAdmin = verifyRole('admin');
const isLibrarian = verifyRole('librarian');
const isUserOrAdmin = verifyRole('user', 'admin');

module.exports = {
    verifyRole,
    isAdmin,
    isLibrarian,
    isUserOrAdmin
};