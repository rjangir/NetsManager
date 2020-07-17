const getPackageInfo = (req, res, db) => {
    db.select('*').from('package_info')
        .then(items => {
            if (items.length) {
                res.json(items)
            } else {
                res.json({ dataExists: 'false' })
            }
        })
        .catch(err => res.status(400).json({ dbError: err }))
    //  .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const getPlayers = (req, res, db) => {
    db.select('*').from('players')
        .then(items => {
            if (items.length) {
                res.json(items)
            } else {
                res.json({ dataExists: 'false' })
            }
        })
        .catch(err => res.status(400).json({ dbError: err }))
    //  .catch(err => res.status(400).json({ dbError: 'db error' }))
}
const postPlayer = (req, res, db) => {
    const { name, amount, package_id } = req.body
    const date = new Date()
    db('players').insert({ name, amount_paid: amount, package_id, created_date: date })
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({ dbError: 'db error', err }))
}


const getTransactions = (req, res, db) => {
    db.select('*').from('transactions')
        .then(items => {
            if (items.length) {
                res.json(items)
            } else {
                res.json({ dataExists: 'false' })
            }
        })
        .catch(err => res.status(400).json({ dbError: err }))
    //  .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const postTransaction = (req, res, db) => {
    const { description, amount, package_id, is_credit } = req.body
    const date = new Date()
    db('transactions').insert({ description, amount, package_id, is_credit, created_date: date })
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({ dbError: 'db error', err }))
}

const putTableData = (req, res, db) => {
    const { id, first, last, email, phone, location, hobby } = req.body
    db('testtable1').where({ id }).update({ first, last, email, phone, location, hobby })
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const deletePlayer = (req, res, db) => {
    const { id } = req.body
    db('players').where({ id }).del()
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch(err => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
    getPackageInfo,
    getPlayers,
    postPlayer,
    deletePlayer,
    getTransactions,
    postTransaction
}