import { useState } from "react";
import { ILecturers } from "../../../interface";
import "./LecturersEl.css";
import ModalEditLecturer from "./ModalEditLecturer";
import { redirect } from "react-router-dom";

function LecturersEl({ lecturer }: { lecturer: ILecturers }) {
  const [modalEditOpener, setModalEditOpener] = useState(false);

  const handleModalEditOpener = () => {
    setModalEditOpener(!modalEditOpener);
  };

  return (
    <div className="lecturerElement">
      <img
        className="lecturerImage"
        src={`src/assets/${lecturer.name}.png`}
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = "src/assets/default.png";
          e.target.alt = "default lecturer photo";
        }}
      />
      <p className="lecturerName">{lecturer.name}</p>
      <div className="lecturerDesc">
        <p className="lecturerBio">Bio: {lecturer.bio}</p>
        <p className="lecturerOrganization">
          Organizacija: {lecturer.organization}
        </p>
        <p className="lecturerThemes">
          Teme: {lecturer.themes.map((theme) => theme.name).join(", ")}
        </p>
        <div className="buttonsContanier">
          <button
            className="viewWorkshopsButton"
            onClick={() => redirect(`/predavaci/${lecturer.id}`)}
          >
            Pregledaj radionice
          </button>
          <button
            className="editLecturerButton"
            onClick={handleModalEditOpener}
          >
            Uredi
          </button>
          {modalEditOpener && (
            <ModalEditLecturer
              lecturer={lecturer}
              lecturerId={lecturer.id}
              setModalEditOpener={setModalEditOpener}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LecturersEl;
