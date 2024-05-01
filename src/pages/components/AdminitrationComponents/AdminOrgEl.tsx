import { useState } from "react";
import { IOrganizationts } from "../../../interface";
import ModalEditWorkshop from "../workshopComponents/ModalEditWorkshop";
import "./AdminEl.css";

function AdminWsEl({ organization }: { organization: IOrganizationts }) {
  const [modalEditOpener, setModalEditOpener] = useState(false);

  const handleModalEditOpener = (e: any) => {
    setModalEditOpener(!modalEditOpener);
  };
  return (
    <>
      <div className="listElement">
        <div className="asdasd">
          <span className="listName">{organization.name}</span>
          <span className="listNoOfApp">{organization.description}</span>
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
