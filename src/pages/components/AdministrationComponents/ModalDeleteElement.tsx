import axios from "axios";
import "./ModalDeleteElement.css";
import {
  IApplicants,
  ILecturers,
  IOrganizationts,
  IWorkshops,
} from "../../../interface";

function ModalDeleteElement({
  handleModalDeleteOpener,
  lecturerId,
  organizationId,
  workshopId,
  workshopName,
  lecturerName,
  organizationName,
  applicantId,
  applicantName,
  setWorkshop,
  workshops,
  setOrganization,
  organizations,
  setLecturer,
  lecturers,
  setApplicant,
  applicants,
  workshopLink,
  organizationLink,
  lecturerLink,
  applicantLink,
  decreaseAppWsId,
}: {
  handleModalDeleteOpener: (arg0: boolean) => void;
  lecturerId: string;
  organizationId: string;
  workshopId: string;
  workshopName: string;
  lecturerName: string;
  organizationName: string;
  applicantId: string;
  applicantName: string;
  setWorkshop: React.Dispatch<React.SetStateAction<IWorkshops[]>>;
  workshops: IWorkshops[];
  setOrganization: React.Dispatch<React.SetStateAction<IOrganizationts[]>>;
  organizations: IOrganizationts[];
  setLecturer: React.Dispatch<React.SetStateAction<ILecturers[]>>;
  lecturers: ILecturers[];
  setApplicant: React.Dispatch<React.SetStateAction<IApplicants[]>>;
  applicants: IApplicants[];
  workshopLink: string;
  organizationLink: string;
  lecturerLink: string;
  applicantLink: string;
  decreaseAppWsId: string;
}) {
  console.log(decreaseAppWsId, applicantId);
  const decreaseApplicants = (e: any) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3001/workshops/${decreaseAppWsId}`, {
        number_of_applications:
          (currentWorkshop?.number_of_applications || 1) - 1,
      })

      .catch((err) => console.log(err.message));
  };

  function findWorkshopById(e: string) {
    if (workshops) {
      return workshops.find((workshop) => workshop.id === e);
    }
    return;
  }

  const currentWorkshop = findWorkshopById(decreaseAppWsId);

  const deleteElement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .delete(
        `http://localhost:3001${
          lecturerLink || organizationLink || workshopLink || applicantLink
        }`
      )
      .then(() => {
        if (workshopId) {
          const updatedWorkshops = workshops.filter(
            (workshop) => workshop.id !== workshopId
          );
          setWorkshop(updatedWorkshops);
        } else if (organizationId) {
          const updatedOrganizations = organizations.filter(
            (org) => org.id !== organizationId
          );
          setOrganization(updatedOrganizations);
        } else if (lecturerId) {
          const updatedLecturers = lecturers.filter(
            (lc) => lc.id !== lecturerId
          );
          setLecturer(updatedLecturers);
        } else if (applicantId) {
          const updatedApplicants = applicants.filter(
            (app) => app.id !== applicantId
          );
          setApplicant(updatedApplicants);
          decreaseApplicants(e);
        }
      })
      .catch((error) => {
        console.error("Error deleting lecturer:", error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    deleteElement(e);

    handleModalDeleteOpener(false);
  };

  return (
    <div
      className="modalContainerDel"
      onClick={(e) => {
        if ((e.target as HTMLElement).className === "modalContainerDel") {
          handleModalDeleteOpener(false);
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="modalDel">
          <div className="close" onClick={() => handleModalDeleteOpener(false)}>
            <p>x</p>
          </div>
          <div className="modalHeader">
            Izbriši{" "}
            {workshopName || lecturerName || organizationName || applicantName}
          </div>
          <div className="modalButtonsContainer">
            <button className="confirmDeleteButton" type="submit">
              Da
            </button>
            <button
              className="withdrawDeleteButton"
              onClick={() => handleModalDeleteOpener(false)}
            >
              Ne
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModalDeleteElement;
