const router = require('express').Router();

router.post("/", (req, res) => {
    res.status(201).json({ id: 1, ...req.body });
});

router.get("/", (req, res) => {
    res.status(200).json([]);
});

router.get("/:id", (req, res) => {
    res.status(200).json({ id: req.params.id });
});

router.put("/:id", (req, res) => {
    res.status(200).json({ id: req.params.id, ...req.body });
});

router.delete("/:id", (req, res) => {
    res.sendStatus(204);
});

module.exports = router;