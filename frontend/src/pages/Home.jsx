import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import axios from 'axios'; // استيراد مكتبة axios
import NoteCard from '../components/NoteCard';
import { toast } from 'react-toastify'


const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [filteredNotes, setFilteredNotes] = useState(false)
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchNodes()
  }, [])

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);



  const fetchNodes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes); // تأكد من أن data.notes موجود
    } catch (error) {
      console.log(error);
    }
  }



  const closeModal = () => {
    setModalOpen(false);
  }

  const onEdit = (note) => {
    setCurrentNote(note)
    setModalOpen(true)
  }

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/note/add',
        { title, description }, // تأكد من أن description نص
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNodes()
        closeModal();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`, // استخدم id هنا
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Task deleted")

        fetchNodes(); // استرجاع الملاحظات بعد التعديل


      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const editNote = async (id, title, description) => { // استقبل id كمعامل
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`, // استخدم id هنا
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNodes(); // استرجاع الملاحظات بعد التعديل
        closeModal();
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  

  return (
    <div className='min-h-screen bg-grey-100'>
      <Navbar setQuery={setQuery} />

      <div className='grid grid-cols-1 gap-6 px-8 pt-4 md:grid-cols-3'>
        {filteredNotes.length > 0 ? filteredNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={onEdit}
            deleteNote={deleteNote}
          />
        )) : <p>No Tasks</p>}

      </div>

      <button
        onClick={() => setModalOpen(true)}
        className='fixed p-4 text-2xl font-bold text-white bg-teal-500 rounded-full right-4 bottom-4'
      >
        +
      </button>
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
}

export default Home;
