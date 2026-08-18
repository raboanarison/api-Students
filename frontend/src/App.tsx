import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <div>
      <h1>Liste des étudiants</h1>

      {students.map((student) => (
        <p key={student.id}>
          {student.nom} - {student.age} ans
        </p>
      ))}
    </div>
  );
}

export default App;