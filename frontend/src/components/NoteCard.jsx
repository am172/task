import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import './NoteCard.css'; // استيراد ملف CSS

const NoteCard = ({ note, onEdit, deleteNote, onComplete }) => {
    const [isCompleted, setIsCompleted] = useState(false);
    const [celebrate, setCelebrate] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        // Retrieve the current date and time
        const now = new Date();
        setCurrentDateTime(now.toLocaleString());

        // Check if the task is completed from localStorage
        const savedStatus = localStorage.getItem(`completed_${note._id}`);
        if (savedStatus) {
            setIsCompleted(savedStatus === 'true');
        }
    }, [note._id]);

    const handleComplete = () => {
        const newStatus = !isCompleted;
        setIsCompleted(newStatus);
        localStorage.setItem(`completed_${note._id}`, newStatus);
        onComplete(note);

        if (!isCompleted) {
            setCelebrate(true); // تفعيل الأنيميشن
            setTimeout(() => setCelebrate(false), 2000); // إلغاء الأنيميشن بعد 2 ثانية
        }
    };

    return (
        <div className={`note-card ${isCompleted ? 'completed' : ''} ${celebrate ? 'animate-bounce' : ''}`}>
            <h2 className='text-xl font-bold'>
                {note.title}
                {isCompleted && <span className='done'> Done</span>}
            </h2>
            <p>{note.description}</p>

            {/* Display current date and time */}
            <p className='mt-2 text-sm text-gray-500'>{currentDateTime}</p>

            <div className='flex justify-end mt-2'>
                <button className='mr-2 text-blue-900' onClick={() => onEdit(note)}>
                    <FaEdit />
                </button>
                <button className='mr-2 text-green-500' onClick={handleComplete}>
                    <FaCheck />
                </button>
                <button className='text-red-500' onClick={() => deleteNote(note._id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default NoteCard;
