import { useState } from "react";
import { IOrganizationts } from "../../../interface";
import "./AdminEl.css";
import ModalEditOrganization from "./ModalEditOrganization";

function AdminWsEl({ organization }: { organization: IOrganizationts }) {
  const [modalEditOpener, setModalEditOpener] = useState(false);

  const handleModalEditOpener = () => {
    setModalEditOpener(!modalEditOpener);
  };
  return (
    <>
      <div className="listElement">
        <div>
          <span className="listName">{organization.name}</span>
          <span className="listDesc">{organization.description}</span>
        </div>

        <div className="listButtons">
          <button className="listEditButton" onClick={handleModalEditOpener}>
            Uredi
          </button>
          {modalEditOpener && (
            <ModalEditOrganization
              organization={organization}
              organizationId={organization.id}
              handleModalEditOpener={handleModalEditOpener}
            />
          )}
          <button className="listDeleteButton">Izbriši</button>
        </div>
      </div>
    </>
  );
}

export default AdminWsEl;
