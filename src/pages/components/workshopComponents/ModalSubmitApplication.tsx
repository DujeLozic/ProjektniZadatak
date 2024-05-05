import { useState } from "react";
import { IApplicants, IWorkshops } from "../../../interface";
import "./ModalSubmitApplication.css";
import axios from "axios";

interface InputForm {
  name: string;
  email: string;
  reason: string;
  workshop: string;
  workshopId: string;
}

function ModalSubmitApplication({
  workshop,
  workshopId,
  handleModalSubmitOpener,
  workshopName,
}: {
  workshop: IWorkshops;
  workshopId: string;
  handleModalSubmitOpener: (arg0: boolean) => void;
  workshopName: string;
}) {
  const [formData, setFormData] = useState<InputForm>({
    name: "",
    email: "",
    reason: "",
    workshop: "",
    workshopId: "",
  });
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const handleModalSubmitted = (e: boolean) => {
    setModalSubmitted(e);
  };

  const increaseApplicants = (e: any) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3001/workshops/${workshopId}`, {
        number_of_applications: workshop.number_of_applications + 1,
      })

      .catch((err) => console.log(err.message));
  };

  const sendData = (e: any) => {
    e.preventDefault();

    axios.post("http://localhost:3001/applicants", formData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData.reason, "");
    sendData(e);
    increaseApplicants(e);
    handleModalSubmitted(true);
  };

  return (
    <div
      className="modalContainer"
      onClick={(e) => {
        if ((e.target as HTMLElement).className === "modalContainer") {
          handleModalSubmitOpener(false);
        }
      }}
    >
      {modalSubmitted ? (
        <div className="modal">
          <div className="close" onClick={() => handleModalSubmitOpener(false)}>
            <p>x</p>
          </div>
          <div className="modalThankYouNote">
            <p>Hvala na prijavi!</p>
          </div>
          <div className="modalSmily">
            <p>🙂</p>
          </div>
          <button
            className="submitModalButton"
            onClick={() => handleModalSubmitOpener(false)}
          >
            Natrag u radionice
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="modal">
            <div
              className="close"
              onClick={() => handleModalSubmitOpener(false)}
            >
              <p>x</p>
            </div>
            <div className="modalHeader">
              Prijavi se na radionicu {workshop.name}
            </div>
            <div>
              <input
                className="modalInputs"
                type="text"
                placeholder="Upiši puno ime..."
                maxLength={25}
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
              ></input>
            </div>
            <div>
              <input
                className="modalInputs"
                type="email"
                placeholder="Upiši email..."
                pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                maxLength={25}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              ></input>
            </div>
            <div>
              <textarea
                className="modalTextArea"
                placeholder="Razlog prijave..."
                maxLength={100}
                value={formData.reason}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reason: e.target.value,
                    workshop: workshopName,
                    workshopId: workshop.id,
                  })
                }
                required
              ></textarea>
            </div>
            <div>
              <button type="submit" className="submitModalButton">
                Prijavi se
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ModalSubmitApplication;
