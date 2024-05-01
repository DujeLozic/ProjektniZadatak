import axios from "axios";
import { useState, useEffect } from "react";
import { ILecturers } from "../interface";
import LecturersFilters from "./components/LecturersComponents/LecturersFilters";

export const Lecturers = () => {
  const [lecturer, setLecturer] = useState<ILecturers[]>([]);

  useEffect(() => {
    axios
      .get<ILecturers[]>("http://localhost:3001/lecturers")
      .then((res) => setLecturer(res.data));
  }, []);

  return (
    <div>
      <LecturersFilters lecturer={lecturer} setLecturer={setLecturer} />
    </div>
  );
};

export default Lecturers;
