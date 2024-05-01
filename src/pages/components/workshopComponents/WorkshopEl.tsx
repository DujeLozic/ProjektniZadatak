import { useState } from "react";
import { IWorkshops } from "../../../interface";
import "./WorkshopEl.css";
import ModalSubmitApplication from "./ModalSubmitApplication";
import ModalEditWorkshop from "./ModalEditWorkshop";

function WorkshopEl({ workshop }: { workshop: IWorkshops }) {
  const [modalSubmitOpener, setModalSubmitOpener] = useState(false);
  const [modalEditOpener, setModalEditOpener] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const handleModalSubmitOpener = () => {
    setModalSubmitOpener(!modalSubmitOpener);
  };

  const handleModalEditOpener = (e: string) => {
    if (e === "y") {
      console.log("asdasdsdasdasdas");
      setIsEditModal(true);
    } else {
      setIsEditModal(false);
    }
    setModalEditOpener(!modalEditOpener);
  };

  return (
    <div className="workshopElement">
      <div className="workshopNameLecturer">
        <img
          className="workshopImage"
          src={`src/assets/${workshop.theme}.png`}
          alt={workshop.name}
        />
        <div>
          <p className="workshopName">{workshop.name}</p>
          <p className="workshopLecturer">Predavac: {workshop.lecturer}</p>
          <p className="workshopDate">Datum: {workshop.date}</p>
        </div>
      </div>
      <p className="workshopDescription">Opis: {workshop.description}</p>
      <button className="submitButton" onClick={handleModalSubmitOpener}>
        Prijavi se
      </button>
      {modalSubmitOpener && (
        <ModalSubmitApplication
          workshop={workshop}
          workshopId={workshop.id}
          setModalSubmitOpener={setModalSubmitOpener}
        />
      )}
      <button className="editButton" onClick={() => handleModalEditOpener("y")}>
        Uredi
      </button>
      {modalEditOpener && (
        <ModalEditWorkshop
          isEditModal={isEditModal}
          workshop={workshop}
          workshopId={workshop.id}
          setModalEditOpener={setModalEditOpener}
        />
      )}
    </div>
  );
}

export default WorkshopEl;
