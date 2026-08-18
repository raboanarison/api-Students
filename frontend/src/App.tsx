import { useEffect, useState } from "react";

interface Student {
  id: number;
  nom: string;
  age: number;
}

function App() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/students", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhbWluIiwiaWF0IjoxNzg3MDUxMzIzLCJleHAiOjE3ODcwNTQ5MjN9.wWCLzOREJWArStCzoDB2SEZ3ybjI8qIaSqrSqhbzsMo"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error("Erreur API :", data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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