import { useState } from "react";
import { ILecturers } from "../../../interface";
import "./LecturersEl.css";
import ModalEditLecturer from "./ModalEditLecturer";
import { useNavigate } from "react-router-dom";

function LecturersEl({
  lecturer,
  setLecturer,
  lecturers,
}: {
  lecturer: ILecturers;
  setLecturer: React.Dispatch<React.SetStateAction<ILecturers[]>>;
  lecturers: ILecturers[];
}) {
  const [modalEditOpener, setModalEditOpener] = useState(false);

  const navigate = useNavigate();

  const handleModalEditOpener = (e: boolean) => {
    setModalEditOpener(e);
  };

  const handleSearch = () => {
    navigate(`/radionice?q=${lecturer.name}`);
  };

  return (
    <div className="lecturerElement">
      <div className="lecturerImageContainer">
        <img
          className="lecturerImage"
          src={
            lecturer.profilePicture
              ? URL.createObjectURL(lecturer.profilePicture)
              : "src/assets/default.png"
          }
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = "src/assets/default.png";
            e.target.alt = "default lecturer photo";
          }}
        />
      </div>

      <p className="lecturerName">{lecturer.name}</p>
      <div className="lecturerDesc">
        <p className="lecturerBio">Bio: {lecturer.bio}</p>
        <p className="lecturerOrganization">
          Organizacija: {lecturer.organization}
        </p>
        <div className="lecturerFooter">
          <p className="lecturerThemes">
            Teme: {lecturer.themes.map((theme) => theme.name).join(", ")}
          </p>
          <div className="buttonsContanier">
            <button
              className="viewWorkshopsButton"
              onClick={() => handleSearch()}
            >
              Pregledaj radionice
            </button>
            <button
              className="editLecturerButton"
              onClick={() => handleModalEditOpener(true)}
            >
              Uredi
            </button>
            {modalEditOpener && (
              <ModalEditLecturer
                lecturer={lecturer}
                lecturerId={lecturer.id}
                handleModalEditOpener={handleModalEditOpener}
                setLecturer={setLecturer}
                lecturers={lecturers}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturersEl;
