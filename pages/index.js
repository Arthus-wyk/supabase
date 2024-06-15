// pages/index.js
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from('notes').select();
      if (error) console.error('Error fetching notes:', error);
      else setNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}
