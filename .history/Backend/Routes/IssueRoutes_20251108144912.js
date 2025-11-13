const express5 = require('express');
const r5 = express5.Router();
const issueCtrl = require('../Controllers/issueController');
const auth5 = require('../Middleware/auth');


r5.post('/issue', auth5, issueCtrl.issueBook);
r5.post('/return', auth5, issueCtrl.returnBook);
module.exports = r5;