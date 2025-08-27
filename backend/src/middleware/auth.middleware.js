export const protectRoute = (req, res, next) => {
    try {
        if (!req.auth?.isAuthenticated){
            console.log("Unauthorized access attempt: Missing or invalid auth")
            return res.status(401).json({
                message: "Unauthorized - you must be logged in",
            });
        }
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error)
        return res.status(500).json({
            message: "Internal server error in authentication check",
        })
    }
}