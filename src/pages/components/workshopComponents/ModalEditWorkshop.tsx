import { useEffect, useState } from "react";
import {
  IDifficultys,
  ILecturers,
  IThemes,
  IWorkshops,
} from "../../../interface";
import axios from "axios";
import "./ModalEditWorkshop.css";

interface InputForm {
  id: string;
  name: string;
  date: string;
  lecturer: string;
  description: string;
  theme: string;
  difficulty: string;
  number_of_aplications: number;
  img: string;
}

function ModalEditWorkshop({
  workshop,
  workshopId,
  isEditModal,
  setModalEditOpener,
}: {
  workshop: IWorkshops;
  workshopId: string;
  isEditModal: boolean;
  setModalEditOpener: (arg0: boolean) => void;
}) {
  const [formData, setFormData] = useState<InputForm>({
    id: "",
    name: "",
    date: "",
    lecturer: "",
    description: "",
    theme: "",
    difficulty: "",
    number_of_aplications: 0,
    img: "",
  });

  const [lecturers, setLecturers] = useState<ILecturers[]>([]);
  const [difficultys, setDifficultys] = useState<IDifficultys[]>([]);
  const [themes, setThemes] = useState<IThemes[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get<IWorkshops>(`http://localhost:3001/workshops/${workshopId}`),
      axios.get<ILecturers[]>("http://localhost:3001/lecturers"),
      axios.get<IDifficultys[]>("http://localhost:3001/difficultys"),
      axios.get<IThemes[]>("http://localhost:3001/themes"),
    ])
      .then(([resFormData, resLecturers, resDifficultys, resThemes]) => {
        if (isEditModal) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            id: resFormData.data.id,
            name: resFormData.data.name,
            date: resFormData.data.date,
            lecturer: resFormData.data.lecturer,
            description: resFormData.data.description,
            theme: resFormData.data.theme,
            difficulty: resFormData.data.difficulty,
            number_of_aplications: resFormData.data.number_of_aplications,
            img: resFormData.data.img,
          }));
        }

        setLecturers(resLecturers.data);
        setDifficultys(resDifficultys.data);
        setThemes(resThemes.data);
      })
      .catch((err) => console.log(err.message));

    console.log(isEditModal);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/workshops/${workshopId}`, formData)
      .then(() => {
        setModalEditOpener(false);
      })
      .catch((err) => console.log(err.message));
  };

  function formatDate(dateString: string): string {
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split("-");
      return `${day}.${month}.${year}`;
    }
    return dateString;
  }

  return (
    <div
      className="modalContainer"
      onClick={(e) => {
        if ((e.target as HTMLElement).className === "modalContainer") {
          setModalEditOpener(false);
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal">
          <div className="close" onClick={() => setModalEditOpener(false)}>
            <p>x</p>
          </div>
          <div className="modalHeader">Uredi radionicu {workshop.name}</div>
          <div className="modalInputElements">
            <label htmlFor="NameWs">Ime radionice: </label>
            <input
              id="NameWs"
              type="text"
              value={formData.name}
              maxLength={25}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            ></input>
          </div>
          <div className="modalInputElements">
            <label htmlFor="DateWs">Datum održavanja: </label>
            <input
              id="DateWs"
              type="text"
              pattern="^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"
              value={formatDate(formData.date)}
              placeholder="DD.MM.YYYY"
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            ></input>
          </div>
          <div className="modalInputElements">
            <label htmlFor="DescriptionWs">Opis radionice: </label>
            <textarea
              id="DescriptionWs"
              maxLength={72}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="modalInputElements">
            <label htmlFor="LecturersWs">Predavači: </label>
            <select
              id="LecturersWs"
              value={formData.lecturer}
              onChange={(e) =>
                setFormData({ ...formData, lecturer: e.target.value })
              }
              required
            >
              <option value="">{workshop.lecturer}</option>
              {lecturers.map((lecturers) => (
                <option key={lecturers.id} value={lecturers.name}>
                  {lecturers.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modalInputElements">
            <label htmlFor="DifficultysWs">Težina: </label>
            <select
              id="DifficultysWs"
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value })
              }
              required
            >
              <option value="">{workshop.difficulty}</option>
              {difficultys.map((difficulty) => (
                <option key={difficulty.id} value={difficulty.name}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modalInputElements">
            <label htmlFor="ThemeWs">Odabeli temu: </label>
            <select
              id="ThemeWs"
              value={formData.theme}
              onChange={(e) =>
                setFormData({ ...formData, theme: e.target.value })
              }
              required
            >
              <option value="">{workshop.theme}</option>
              {themes.map((themes) => (
                <option key={themes.id} value={themes.name}>
                  {themes.name}
                </option>
              ))}
            </select>
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

export default ModalEditWorkshop;
