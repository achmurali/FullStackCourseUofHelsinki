import express from 'express';

const router = express.Router();

router.get("/",(_req,res) => {
    res.send("test");
});

router.post("/",(_req,res) => {
    res.send("test1");
});

export default router;