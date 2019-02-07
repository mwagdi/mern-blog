const Media = require('../models/Media');

const listMedia = (req,res,next) => {
    Media.find()
    .then(media => res.json({ media }));
}

const addMedia = (req,res,next) => {
    var total = req.files.length;
    let fileArray = [];

    const saveAll = () => {
        let doc = req.files.pop();
        let fileEntry = new Media({
            src: doc.path
        });

        fileEntry.save((err, saved) => {
            if (err) throw err;//handle error
            fileArray.push(saved);

            if (--total) {
                saveAll();
            }
            else{
                res.json({added: fileArray});
            }
        })
    }

    saveAll();
}

const deleteMedia = (req,res,next) => {
    Media.findByIdAndDelete(req.params.id)
    .then(() => res.json({success: "Media deleted"}));
}

module.exports = {
    listMedia,
    addMedia,
    deleteMedia
}