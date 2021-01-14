const router = require('express').Router();

function generateUniqueString() {
    var ts = String(new Date().getTime()),
        i = 0,
        out = '';

    for (i = 0; i < ts.length; i += 2) {
        out += Number(ts.substr(i, 2)).toString(36);
    }

    return out;
}

router.get("/:id?", (req, res) => {
    let id;
    if (req.query.boardName) {
        id = req.query.boardName;
        return res.redirect(`/board/${id}`);

    } else if (!req.params.id) {
        id = generateUniqueString();
        return res.redirect(`/board/${id}`);

    } else res.render('board', {
        layout: 'board'
    });


});



module.exports = router;