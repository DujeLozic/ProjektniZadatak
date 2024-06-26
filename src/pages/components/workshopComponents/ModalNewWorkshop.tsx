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
  name: string;
  date: string;
  lecturer: string;
  description: string;
  theme: string;
  difficulty: string;
  number_of_applications: number;
}

function ModalNewWorkshop({
  setWorkshop,
  handleModalNewOpener,
}: {
  setWorkshop: React.Dispatch<React.SetStateAction<IWorkshops[]>>;
  handleModalNewOpener: (arg0: boolean) => void;
}) {
  const [formData, setFormData] = useState<InputForm>({
    name: "",
    date: "",
    lecturer: "",
    description: "",
    theme: "",
    difficulty: "",
    number_of_applications: 0,
  });

  const [lecturers, setLecturers] = useState<ILecturers[]>([]);
  const [difficultys, setDifficultys] = useState<IDifficultys[]>([]);
  const [themes, setThemes] = useState<IThemes[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get<ILecturers[]>("http://localhost:3001/lecturers"),
      axios.get<IDifficultys[]>("http://localhost:3001/difficultys"),
      axios.get<IThemes[]>("http://localhost:3001/themes"),
    ])
      .then(([resLecturers, resDifficultys, resThemes]) => {
        setLecturers(resLecturers.data);
        setDifficultys(resDifficultys.data);
        setThemes(resThemes.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3001/workshops/`, formData)
      .then((res) => {
        setWorkshop((workshop) => [...workshop, res.data]);
        handleModalNewOpener(false);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div
      className="modalContainer"
      onClick={(e) => {
        if ((e.target as HTMLElement).className === "modalContainer") {
          handleModalNewOpener(false);
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal">
          <div className="close" onClick={() => handleModalNewOpener(false)}>
            <p>x</p>
          </div>
          <div className="modalHeader">Dodaj novu radionicu</div>
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
              value={formData.date}
              placeholder="DD.MM.YYYY"
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            ></input>
          </div>
          <div className="modalInputElements">
            <label htmlFor="DescriptionWs">Opis radionice:</label>
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
              <option value="">--</option>
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
              <option value="">--</option>
              {difficultys.map((difficulty) => (
                <option key={difficulty.id} value={difficulty.name}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modalFooter">
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
                <option value="">--</option>
                {themes.map((themes) => (
                  <option key={themes.id} value={themes.name}>
                    {themes.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="submitModalButton" type="submit">
              Dodaj
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModalNewWorkshop;
