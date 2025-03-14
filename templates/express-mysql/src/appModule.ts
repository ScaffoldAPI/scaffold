import { Router } from "express";

const router = Router();

router.get("/test", (_req, res) => {
    res.json({ message: "API funcionando!" });
});

export default router;