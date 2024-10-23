import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js';
const router = express.Router()

router.post('/add', middleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        });
        await newNote.save();
        return res.status(200).json({ success: true, message: "Task created successfully" });
    } catch (error) {
        console.log('Error:', error.message);
        return res.status(500)
        .json({ success: false, message: `Error in adding Task: ${error.message}` });
    }
}) 

router.get('/' , middleware, async (req, res) => {
    try {
        
        const notes = await Note.find({userId: req.user.id})
        return res.status(200).json({success: true, notes})
    } catch(error) {
        return res.status(500).json({success: false, message: "cant retrive notes"})
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const updateNote = await Note.findByIdAndUpdate(id, req.body)
        return res.status(200).json({success: true, updateNote})

    } catch(error) {
        return res.status(500).json({success: false, message: "cant update notes"})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const DeleteNote = await Note.findByIdAndDelete(id)
        return res.status(200).json({success: true, DeleteNote})

    } catch(error) {
        return res.status(500).json({success: false, message: "cant delete notes"})
    }
})





export default router;
