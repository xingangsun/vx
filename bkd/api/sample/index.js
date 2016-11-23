export default function (router, db) {
    router.get('/sample', function (req, res, next) {
        res.json(db.get('posts').getById(1).value())
    }).get('/sample1', function (req, res, next) {
        res.json(db.get('posts').getById(1).value())
    })
}
