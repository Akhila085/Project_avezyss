const express = require('express');
const { signup, getAllusers, getuserbyid, updateuser, deleteuser } = require('../controllers/registerController');

const router = express.Router();

router.post('/signup', signup);
router.get('/', getAllusers);
router.get('/:id', getuserbyid);
router.put('/:id', updateuser);
router.delete('/:id', deleteuser);

module.exports = router;
