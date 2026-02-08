import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

router.get('/routes/health', (req, res) => {
    res.json({ message: "Health OK! At least routes are working :)" })
})

router.get('/database/health', async (req, res) => {
    const users = await prisma.user.findMany()

    res.json({ message: "Database is working, uffhhh Bach Gaye!", users })
})

export default router;