// app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
type Note = {
  id: number;
  title: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from('notes').select();
      if (error) {
        console.error('===Error fetching notes:===', error);
      } else {
        console.log('Fetched notes:', data);
        setNotes(data as Note[]);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
