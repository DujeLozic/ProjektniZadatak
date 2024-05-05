import { useContext, useState } from "react";
import { ILecturers } from "../../../interface";
import "./LecturersEl.css";
import ModalEditLecturer from "./ModalEditLecturer";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../Context";

function LecturersEl({
  lecturer,
  setLecturer,
  lecturers,
}: {
  lecturer: ILecturers;
  setLecturer: React.Dispatch<React.SetStateAction<ILecturers[]>>;
  lecturers: ILecturers[];
}) {
  const user = useContext(Context);
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
            {user === "Admin" && (
              <button
                className="editLecturerButton"
                onClick={() => handleModalEditOpener(true)}
              >
                Uredi
              </button>
            )}

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
