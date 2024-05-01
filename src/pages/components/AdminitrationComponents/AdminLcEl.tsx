import { useState } from "react";
import { ILecturers } from "../../../interface";
import ModalEditWorkshop from "../workshopComponents/ModalEditWorkshop";
import "./AdminEl.css";
import ModalEditLecturer from "../LecturersComponents/ModalEditLecturer";

function AdminWsEl({ lecturer }: { lecturer: ILecturers }) {
  const [modalEditOpener, setModalEditOpener] = useState(false);

  const handleModalEditOpener = (e: any) => {
    setModalEditOpener(!modalEditOpener);
  };
  return (
    <>
      <div className="listElement">
        <div className="asdasd">
          <span className="listName">{lecturer.name}</span>
          <span className="listNoOfApp">{lecturer.organization}</span>
          <span className="listDate">
            {lecturer.themes.map((theme) => theme.name).join(", ")}
          </span>
        </div>

        <div className="listButtons">
          <button className="listEditButton" onClick={handleModalEditOpener}>
            Uredi
          </button>
          {modalEditOpener && (
            <ModalEditLecturer
              lecturer={lecturer}
              lecturerId={lecturer.id}
              setModalEditOpener={setModalEditOpener}
            />
          )}
          <button className="listDeleteButton">Izbriši</button>
        </div>
      </div>
    </>
  );
}

export default AdminWsEl;
