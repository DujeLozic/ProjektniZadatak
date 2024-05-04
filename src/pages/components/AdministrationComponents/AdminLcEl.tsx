import { useState } from "react";
import { ILecturers } from "../../../interface";
import "./AdminEl.css";
import ModalEditLecturer from "../LecturersComponents/ModalEditLecturer";
import ModalDeleteElement from "./ModalDeleteElement";

function AdminWsEl({
  lecturer,
  setLecturer,
  lecturers,
}: {
  lecturer: ILecturers;
  setLecturer: React.Dispatch<React.SetStateAction<ILecturers[]>>;
  lecturers: ILecturers[];
}) {
  const [modalEditOpener, setModalEditOpener] = useState(false);
  const [modalDeleteOpener, setModalDeleteOpener] = useState(false);

  const handleModalEditOpener = (e: boolean) => {
    setModalEditOpener(e);
  };

  const handleModalDeleteOpener = (e: boolean) => {
    setModalDeleteOpener(e);
  };

  return (
    <div className="listElement">
      <div>
        <span className="listName">{lecturer.name}</span>
        <span className="listOrg">{lecturer.organization}</span>
        <span className="listThemes">
          {lecturer.themes.map((theme) => theme.name).join(", ")}
        </span>
      </div>

      <div className="listButtons">
        <button
          className="listEditButton"
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
        <button
          className="listDeleteButton"
          onClick={() => handleModalDeleteOpener(true)}
        >
          Izbriši
        </button>
        {modalDeleteOpener && (
          <ModalDeleteElement
            key={lecturer.id}
            handleModalDeleteOpener={handleModalDeleteOpener}
            lecturerLink={`/lecturers/${lecturer.id}`}
            lecturerId={lecturer.id}
            lecturerName={`predavača ${lecturer.name}`}
            setLecturer={setLecturer}
            lecturers={lecturers}
          />
        )}
      </div>
    </div>
  );
}

export default AdminWsEl;
