import { useState } from "react";
import { IOrganizationts } from "../../../interface";
import "./AdminEl.css";
import ModalEditOrganization from "./ModalEditOrganization";
import ModalDeleteElement from "./ModalDeleteElement";

function AdminWsEl({
  organization,
  setOrganization,
  organizations,
}: {
  organization: IOrganizationts;
  setOrganization: React.Dispatch<React.SetStateAction<IOrganizationts[]>>;
  organizations: IOrganizationts[];
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
          <span className="listName">{organization.name}</span>
          <span className="listDesc">{organization.description}</span>
        </div>

        <div className="listButtons">
          <button
            className="listEditButton"
            onClick={() => handleModalEditOpener(true)}
          >
            Uredi
          </button>
          {modalEditOpener && (
            <ModalEditOrganization
              organization={organization}
              organizationId={organization.id}
              handleModalEditOpener={handleModalEditOpener}
              setOrganization={setOrganization}
              organizations={organizations}
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
              key={organization.id}
              handleModalDeleteOpener={handleModalDeleteOpener}
              lecturerLink={`/organizations/${organization.id}`}
              lecturerId={organization.id}
              organizationId={organization.id}
              organizationName={`organizaciju ${organization.name}`}
              setOrganization={setOrganization}
              organizations={organizations}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminWsEl;
