import { useState } from "react";
import { ILecturers } from "../../../interface";
import "./AdminEl.css";
import ModalEditLecturer from "../LecturersComponents/ModalEditLecturer";
import ModalDeleteElement from "./ModalDeleteElement";

function AdminWsEl({
  lecturer,
  setModalDeleteOpener,
  modalDeleteOpener,
}: {
  lecturer: ILecturers;
  setModalDeleteOpener: (arg0: boolean) => void;
  modalDeleteOpener: boolean;
}) {
  const [modalEditOpener, setModalEditOpener] = useState(false);

  const handleModalEditOpener = () => {
    setModalEditOpener(!modalEditOpener);
  };
  return (
    <>
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
            onClick={() => setModalEditOpener(true)}
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
          <button
            className="listDeleteButton"
            onClick={() => setModalDeleteOpener(true)}
          >
            Izbriši
          </button>
          {modalDeleteOpener && (
            <ModalDeleteElement
              setModalDeleteOpener={setModalDeleteOpener}
              lecturerId={lecturer.id}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminWsEl;
