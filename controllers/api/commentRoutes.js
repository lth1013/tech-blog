const router = require('express').Router();
const { User, Post, Comment } = require("../../models");

router.get("/post/:id", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: { post_id: req.params.id },
            include: [{ model: User }],
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(403).json({ message: "You must be logged in to comment" });
            return;
        }
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(403).json({ message: "You must be logged in to comment" });
            return;
        }
        const commentData = await Comment.update(
            {
                comment_text: req.body.comment_text,
            },
            {
                where: { id: req.params.id },
            }
        );
        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: { id: req.params.id },
        });
        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;