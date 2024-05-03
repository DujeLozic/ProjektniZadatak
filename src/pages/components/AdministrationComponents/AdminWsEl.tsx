import { useState } from "react";
import { IWorkshops } from "../../../interface";
import ModalEditWorkshop from "../workshopComponents/ModalEditWorkshop";
import "./AdminEl.css";

function AdminWsEl({ workshop }: { workshop: IWorkshops }) {
  const [modalEditOpener, setModalEditOpener] = useState(false);

  const handleModalEditOpener = () => {
    setModalEditOpener(!modalEditOpener);
  };
  return (
    <>
      <div className="listElement">
        <div>
          <span className="listName">{workshop.name}</span>
          <span className="listNoOfApp">
            Broj prijava: {workshop.number_of_aplications}
          </span>
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
