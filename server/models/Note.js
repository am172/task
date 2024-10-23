
import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }, // يجب أن يكون نص
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

const Note = mongoose.model('Note', NoteSchema);
export default Note;