function upload(req, res) {
    if(req.file.filename) {
        res.status(201).json({
            statusCode: 201,
            message: "File uploaded successfully!",
            isSuccess: true
        })
    }
    else {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong!",
            isSuccess: false
        })
    }
}

module.exports = {
    upload: upload
}