import axios from 'axios';
import { useEffect, useState } from 'react';
axios
const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title)
            setDescription(currentNote.description)
     
        }

    }, [currentNote])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', { id: currentNote ? currentNote._id : 'new', title, description }); // تحقق من القيم
        if (currentNote) {
            await editNote(currentNote._id, title, description);
        } else {
            await addNote(title, description);
        }
    };
    

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
            <div className='p-8 bg-white rounded'>
                <h2 className='mb-4 text-xl font-bold'>{currentNote ? "Edite Task" : "Add New Task"}</h2> {/* Corrected text-xl */}
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Task Title'
                        className='w-full p-2 mb-4 border'
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                        className='w-full p-2 mb-4 border'
                    />
                    <button
                        type='submit'
                        className='px-4 py-2 text-white bg-blue-500 rounded' /* Fixed padding */
                    >
                        {currentNote ? "Update Task" : "Add Task"}
                    </button>
                </form>
                <button className='mt-4 text-red-500' onClick={closeModal}>
                    Cancel {/* Corrected text */}
                </button>
            </div>
        </div>
    );
};

export default NoteModal;
