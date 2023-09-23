import Express from "express";
import contactController from "../controller/contact-controller";

const router = Express.Router();

router.post('/', contactController.addContact);
router.get('/', contactController.getContact);
router.patch('/:userId', contactController.updateContact);
router.delete('/:userId', contactController.deleteContact);

export default router;