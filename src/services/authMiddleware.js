module.exports = {
    isAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error_messages", "Please login to view this resource");
        res.status(401).json({
            error: true,
            status: 401,
            message: 'Not authenticated!',
            flash: req.flash("error_messages")
        });
    },
    isAdmin: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === 1) {
            return next();
        }
        req.flash("error_messages", "Not authorized to view this resource only for admins!");
        res.status(401).json({
            error: true,
            status: 401,
            message: 'Not authenticated!',
            flash: req.flash("error_messages")
        });
    },
    isGoogle: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect("/api/dashboardTest");
        }
        return next();
    }
}