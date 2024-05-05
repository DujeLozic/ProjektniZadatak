import { useContext, useState } from "react";
import { IWorkshops } from "../../../interface";
import "./WorkshopEl.css";
import ModalSubmitApplication from "./ModalSubmitApplication";
import ModalEditWorkshop from "./ModalEditWorkshop";
import { Context } from "../../../Context";

function WorkshopEl({
  workshop,
  setWorkshop,
  workshops,
}: {
  workshop: IWorkshops;
  setWorkshop: React.Dispatch<React.SetStateAction<IWorkshops[]>>;
  workshops: IWorkshops[];
}) {
  const user = useContext(Context);
  const [modalSubmitOpener, setModalSubmitOpener] = useState(false);
  const [modalEditOpener, setModalEditOpener] = useState(false);

  const handleModalSubmitOpener = (e: boolean) => {
    setModalSubmitOpener(e);
  };

  const handleModalEditOpener = (e: boolean) => {
    setModalEditOpener(e);
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
          <p className="workshopDescription">Opis: {workshop.description}</p>

          <p className="workshopLecturer">Predavac: {workshop.lecturer}</p>
          <p className="workshopDate">Datum: {workshop.date}</p>
        </div>
      </div>

      <button
        className="submitButton"
        onClick={() => handleModalSubmitOpener(true)}
      >
        Prijavi se
      </button>
      {modalSubmitOpener && (
        <ModalSubmitApplication
          workshop={workshop}
          workshopId={workshop.id}
          handleModalSubmitOpener={handleModalSubmitOpener}
          workshopName={workshop.name}
        />
      )}
      {user === "Admin" && (
        <button
          className="editButton"
          onClick={() => handleModalEditOpener(true)}
        >
          Uredi
        </button>
      )}
      {modalEditOpener && (
        <ModalEditWorkshop
          workshop={workshop}
          workshopId={workshop.id}
          handleModalEditOpener={setModalEditOpener}
          setWorkshop={setWorkshop}
          workshops={workshops}
        />
      )}
    </div>
  );
}

export default WorkshopEl;
