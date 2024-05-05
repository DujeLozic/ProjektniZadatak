import { useState } from "react";
import { IWorkshops } from "../../../interface";
import ModalEditWorkshop from "../workshopComponents/ModalEditWorkshop";
import "./AdminEl.css";
import ModalDeleteElement from "./ModalDeleteElement";

function AdminWsEl({
  workshop,
  setWorkshop,
  workshops,
}: {
  workshop: IWorkshops;
  setWorkshop: React.Dispatch<React.SetStateAction<IWorkshops[]>>;
  workshops: IWorkshops[];
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
    <>
      <div className="listElement">
        <div>
          <span className="listName">{workshop.name}</span>
          <span className="listNoOfApp">
            Broj prijava: {workshop.number_of_applications}
          </span>
          <span className="listDate">{workshop.date}</span>
        </div>

        <div className="listButtons">
          <button
            className="listEditButton"
            onClick={() => handleModalEditOpener(true)}
          >
            Uredi
          </button>
          {modalEditOpener && (
            <ModalEditWorkshop
              workshop={workshop}
              workshopId={workshop.id}
              handleModalEditOpener={handleModalEditOpener}
              setWorkshop={setWorkshop}
              workshops={workshops}
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
              key={workshop.id}
              handleModalDeleteOpener={setModalDeleteOpener}
              lecturerLink={`/workshops/${workshop.id}`}
              lecturerId={workshop.id}
              workshopId={workshop.id}
              setWorkshop={setWorkshop}
              workshops={workshops}
              workshopName={`radionicu ${workshop.name}`}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminWsEl;
