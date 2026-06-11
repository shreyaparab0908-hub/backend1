const router = express.Router();

router.post('/profile', addProfile);  
router.get('/profile', getAllProfiles);
router.put('/profile', updateProfile);
router.delete('/profile', deleteProfile);

module.exports = router;