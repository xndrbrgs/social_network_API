const router = required('express').router();
const apiRoutes = require('/api');

router.use('/api', apiRoutes);
router.use((req, res) => res.send('Incorrect Route!'));

module.exports = router;