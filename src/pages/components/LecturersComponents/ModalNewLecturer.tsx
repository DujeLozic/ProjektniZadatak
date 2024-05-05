import { useEffect, useState } from "react";
import { ILecturers, IOrganizationts, IThemes } from "../../../interface";
import axios from "axios";
import Select, { OptionsOrGroups } from "react-select";

interface InputForm {
  name: string;
  bio: string;
  organization: string;
  themes: IThemes[];
}

interface Option {
  value: string;
  label: string;
}

type Group = {
  value: string;
  label: string;
  options: Option[];
};

function ModalNewLecturer({
  setLecturer,
  handleModalNewOpener,
}: {
  setLecturer: React.Dispatch<React.SetStateAction<ILecturers[]>>;
  handleModalNewOpener: (arg0: boolean) => void;
}) {
  const [formData, setFormData] = useState<InputForm>({
    name: "",
    bio: "",
    organization: "",
    themes: [],
  });

  const mapValuesToOptions = (
    values: IThemes[]
  ): OptionsOrGroups<Option, Group> => {
    return values.map((theme) => {
      return { value: theme.id, label: theme.name };
    });
  };

  const [themes, setThemes] = useState<IThemes[]>([]);
  const [organizations, setOrganizations] = useState<IOrganizationts[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<readonly Option[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get<IThemes[]>("http://localhost:3001/themes"),
      axios.get<IOrganizationts[]>("http://localhost:3001/organizations"),
    ])
      .then(([resThemes, resOrganizations]) => {
        setThemes(resThemes.data);
        setOrganizations(resOrganizations.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/lecturers", formData)
      .then((res) => {
        setLecturer((lecturer) => [...lecturer, res.data]);
        handleModalNewOpener(false);
      })
      .catch((err) => console.log(err.message));
  };

  const mapOptionsToValues = (options: readonly Option[]): IThemes[] => {
    return options.map((option) => {
      return { id: option.value, name: option.label };
    });
  };

  const onChangeTheme = (option: readonly Option[]) => {
    setSelectedOptions(option);
    setFormData({
      ...formData,
      themes: mapOptionsToValues(option),
    });
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
          <div className="modalHeader">Dodaj novog predavača</div>
          <div className="modalInputElements">
            <label htmlFor="NameLec">Ime predavača: </label>
            <input
              id="NameLec"
              type="text"
              value={formData.name}
              maxLength={25}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="modalInputElements">
            <label htmlFor="BioLec">Bio: </label>
            <textarea
              id="BioLec"
              maxLength={72}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="modalInputElements">
            <label htmlFor="OranizationLec">Organizacija: </label>
            <select
              id="OranizationLec"
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              required
            >
              <option value="">--</option>
              {organizations.map((organization) => (
                <option key={organization.id} value={organization.name}>
                  {organization.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modalFooter">
            <div className="modalInputElements">
              <label htmlFor="ThemesLec">Teme: </label>
              <Select
                className="multiSelect"
                id="ThemesLec"
                options={mapValuesToOptions(themes)}
                value={selectedOptions}
                onChange={onChangeTheme}
                isMulti={true}
                required
              />
            </div>

            <button type="submit" className="submitModalButton">
              Spremi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModalNewLecturer;
