import axios from "axios";
import { useState, useEffect } from "react";
import { ILecturers } from "../interface";
import LecturersFilters from "./components/LecturersComponents/LecturersFilters";
import { ClipLoader } from "react-spinners";

export const Lecturers = () => {
  const [lecturer, setLecturer] = useState<ILecturers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<ILecturers[]>("http://localhost:3001/lecturers").then((res) => {
      setTimeout(() => {
        setLecturer(res.data);
        setLoading(false);
      }, 1000);
    });
  }, []);

  return (
    <div>
      {loading === false ? (
        <LecturersFilters lecturer={lecturer} setLecturer={setLecturer} />
      ) : (
        <div className="loaderContainer">
          <ClipLoader />
        </div>
      )}
    </div>
  );
};

export default Lecturers;
