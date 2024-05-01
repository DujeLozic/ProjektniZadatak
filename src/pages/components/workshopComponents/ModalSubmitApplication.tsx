import { useState } from "react";
import { IApplicants, IWorkshops } from "../../../interface";
import "./ModalSubmitApplication.css";
import axios from "axios";

interface InputForm {
  id: number;
  name: string;
  email: string;
  reason: string;
}

function ModalSubmitApplication({
  workshop,
  workshopId,
  setModalSubmitOpener,
}: {
  workshop: IWorkshops;
  workshopId: string;
  setModalSubmitOpener: (arg0: boolean) => void;
}) {
  const [applicants, setApplicants] = useState<IApplicants[]>([]);
  const [formData, setFormData] = useState<InputForm>({
    id: applicants.length,
    name: "",
    email: "",
    reason: "",
  });
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const handleModalSubmitted = () => {
    setModalSubmitted(!modalSubmitted);
  };

  const increaseApplicants = (e: any) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3001/workshops/${workshopId}`, {
        number_of_aplications: workshop.number_of_aplications + 1,
      })

      .catch((err) => console.log(err.message));
  };

  const sendData = (e: any) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/applicants", formData)
      .then((resFormData) => {
        // setApplicants([...applicants, res.data]);
        setApplicants((prevFormData) => ({
          ...prevFormData,
          id: applicants.length + 1,
          name: resFormData.data.name,
          email: resFormData.data.email,
          reason: resFormData.data.reason,
        }));
      });
  };

  const handleSubmit = (e: any) => {
    sendData(e);
    increaseApplicants(e);
    handleModalSubmitted();
  };

  return (
    <div
      className="modalContainer"
      onClick={(e) => {
        if ((e.target as HTMLElement).className === "modalContainer") {
          setModalSubmitOpener(false);
        }
      }}
    >
      {modalSubmitted ? (
        <div className="modal">
          <div className="close" onClick={() => setModalSubmitOpener(false)}>
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
            onClick={() => setModalSubmitOpener(false)}
          >
            Natrag u radionice
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="modal">
            <div className="close" onClick={() => setModalSubmitOpener(false)}>
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
                  setFormData({ ...formData, name: e.target.value })
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
                maxLength={145}
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
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
