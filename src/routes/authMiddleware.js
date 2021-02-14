module.exports = {
    isAuth: (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        //req.flash("error_messages","Please login to view this resource");
        res.json({msg:"Login to view this resource!"});
    },
    isAdmin:(req,res,next)=>{
        if(req.isAuthenticated() && req.user.role===1){
            return next();
        }
        res.json({msg:"Not authorized to view this resource only for admins!"});
    }  
}