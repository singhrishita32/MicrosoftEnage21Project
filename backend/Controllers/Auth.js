//SIGNOUT
exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({message: "Signed Out!"});
} 
