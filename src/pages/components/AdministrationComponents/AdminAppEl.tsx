import { useState } from "react";
import ModalDeleteElement from "./ModalDeleteElement";
import { IApplicants } from "../../../interface";

function AdminAppEl({
  applicant,
  setApplicant,
  applicants,
}: {
  applicant: IApplicants;
  setApplicant: React.Dispatch<React.SetStateAction<IApplicants[]>>;
  applicants: IApplicants[];
}) {
  const [modalDeleteOpener, setModalDeleteOpener] = useState(false);

  const handleModalDeleteOpener = (e: boolean) => {
    setModalDeleteOpener(e);
  };

  return (
    <div className="listElement">
      <div>
        <span className="listName">{applicant.name}</span>
        <span className="listEmail">{applicant.email}</span>
        <span className="listWs">{applicant.workshop}</span>
      </div>

      <button
        className="listDeleteButton"
        onClick={() => handleModalDeleteOpener(true)}
      >
        Izbriši
      </button>
      {modalDeleteOpener && (
        <ModalDeleteElement
          key={applicant.id}
          handleModalDeleteOpener={handleModalDeleteOpener}
          applicantId={applicant.id}
          applicantLink={`/applicants/${applicant.id}`}
          applicantName={`prijavu ${applicant.name}`}
          setApplicant={setApplicant}
          applicants={applicants}
          decreaseAppWsId={applicant.workshopId}
        />
      )}
    </div>
  );
}

export default AdminAppEl;
