import { useState } from "react";
import { IWorkshops } from "../../../interface";
import ModalEditWorkshop from "../workshopComponents/ModalEditWorkshop";
import "./AdminEl.css";

function AdminWsEl({ workshop }: { workshop: IWorkshops }) {
  const [modalEditOpener, setModalEditOpener] = useState(false);

  const handleModalEditOpener = (e: any) => {
    setModalEditOpener(!modalEditOpener);
  };
  return (
    <>
      <div className="listElement">
        <div className="asdasd">
          <span className="listName">{workshop.name}</span>
          <span className="listNoOfApp">{workshop.number_of_aplications}</span>
          <span className="listDate">{workshop.date}</span>
        </div>

        <div className="listButtons">
          <button className="listEditButton" onClick={handleModalEditOpener}>
            Uredi
          </button>
          {modalEditOpener && (
            <ModalEditWorkshop
              workshop={workshop}
              workshopId={workshop.id}
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
