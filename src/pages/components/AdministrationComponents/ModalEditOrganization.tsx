import { useEffect, useState } from "react";
import { IOrganizationts } from "../../../interface";
import axios from "axios";
import "./ModalEditOrganization.css";

interface InputForm {
  id: string;
  name: string;
  description: string;
}

function ModalEditOrganization({
  organization,
  organizationId,
  handleModalEditOpener,
}: {
  organization: IOrganizationts;
  organizationId: string;
  handleModalEditOpener: (arg0: boolean) => void;
}) {
  const [formData, setFormData] = useState<InputForm>({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get<IOrganizationts>(
        `http://localhost:3001/organization/${organizationId}`
      )
      .then((resFormData) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: resFormData.data.id,
          name: resFormData.data.name,
          description: resFormData.data.description,
        }));
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/organization/${organizationId}`, formData)
      .then(() => {
        handleModalEditOpener(false);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div
      className="modalContainer"
      onClick={(e) => {
        if ((e.target as HTMLElement).className === "modalContainer") {
          handleModalEditOpener(false);
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal">
          <div className="close" onClick={() => handleModalEditOpener(false)}>
            <p>x</p>
          </div>
          <div className="modalHeader">
            Uredi organizaciju {organization.name}
          </div>
          <div className="modalInputElementsOrg">
            <label htmlFor="NameOrg">Ime organizacije: </label>
            <input
              id="NameOrg"
              type="text"
              value={formData.name}
              maxLength={25}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            ></input>
          </div>
          <div className="modalInputElementsOrg">
            <label htmlFor="DescriptionOrg">Opis organizacije: </label>
            <textarea
              id="DescriptionOrg"
              maxLength={72}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div>
            <button type="submit" className="submitModalButton">
              Spremi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModalEditOrganization;
