const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new AWS.S3();

AWS.config.update({
    region: process.env.AWS_S3_REGION,
    correctClockSkew: true
})

const uploadMedia = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'backcourts-bucket',
        metadata: (req, file, cb) => {
            const { user } = req;
            cb(null, {
                playerId: user.id,
                uploadDate: new Date().toISOString(),
                fileSize: file.size,
                originalname: file.originalname,
                contentType: file.mimetype
            })
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + "-" + req.user.name + "-" + file.originalname); //use Date.now() for unique file keys
        }
    })
}).single("image");

const deleteMedia = (images) => {
    if (images.length) {
        images.forEach( async(image) => {
            const imageKey = image.url.split('/');
            const imageKeyUnencoded = imageKey[imageKey.length - 1]
            const key = decodeURI(imageKeyUnencoded)
            const params = {
                Bucket: "backcourts-bucket",
                Key: key
            }
            await s3.deleteObject(params).promise();
        })
    }
}



module.exports = { uploadMedia, deleteMedia };