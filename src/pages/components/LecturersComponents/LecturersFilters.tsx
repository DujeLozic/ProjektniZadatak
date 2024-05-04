import { useState } from "react";
import { ILecturers } from "../../../interface";
import "./LecturersFilters.css";
import LecturersEl from "./LecturersEl";
import ModalNewLecturer from "./ModalNewLecturer";

function LecturersFilters({
  lecturer,
  setLecturer,
}: {
  lecturer: ILecturers[];
  setLecturer: React.Dispatch<React.SetStateAction<ILecturers[]>>;
}) {
  const [filterTheme, setFilterTheme] = useState("All");
  const [filterOrganization, setFilterOrganization] = useState("All");
  const [modalNewOpener, setModalNewOpener] = useState(false);

  const handleChangeTheme = (e: any) => {
    setFilterTheme(e.target.value);
  };

  const handleChangeOrganization = (e: any) => {
    setFilterOrganization(e.target.value);
  };

  const handleModalNewOpener = (e: boolean) => {
    setModalNewOpener(e);
  };

  return (
    <>
      <div className="workshopButtonContanier">
        <button
          className="newWorkshopButton"
          onClick={() => handleModalNewOpener(true)}
        >
          Dodaj novu radionicu
        </button>
      </div>
      {modalNewOpener && (
        <ModalNewLecturer
          setLecturer={setLecturer}
          handleModalNewOpener={handleModalNewOpener}
        />
      )}
      <div className="workshopsAndFilters">
        <div className="filters">
          <div className="filtersInner">
            <p>Teme</p>
            <div>
              <label htmlFor="React">React</label>
              <input
                type="checkbox"
                id="React"
                value="React"
                onChange={handleChangeTheme}
                checked={filterTheme === "React"}
              ></input>
            </div>
            <div>
              <label htmlFor="Express">Express</label>
              <input
                type="checkbox"
                id="Express"
                value="Express"
                onChange={handleChangeTheme}
                checked={filterTheme === "Express"}
              ></input>
            </div>
            <div>
              <label htmlFor="Next.js">Next.js</label>
              <input
                type="checkbox"
                id="Next.js"
                value="Next.js"
                onChange={handleChangeTheme}
                checked={filterTheme === "Next.js"}
              ></input>
            </div>
            <div>
              <label htmlFor="Node.js">Node.js</label>
              <input
                type="checkbox"
                id="Node.js"
                value="Node.js"
                onChange={handleChangeTheme}
                checked={filterTheme === "Node.js"}
              ></input>
            </div>
          </div>

          <div>
            <p>Organizacije</p>
            <div>
              <label className="labelDD" htmlFor="Digital Dalmacija">
                Digital Dalmacija
              </label>
              <input
                type="checkbox"
                id="Digital Dalmacija"
                value="Digital Dalmacija"
                onChange={handleChangeOrganization}
                checked={filterOrganization === "Digital Dalmacija"}
              ></input>
            </div>
            <div>
              <label htmlFor="Agilno">Agilno</label>
              <input
                type="checkbox"
                id="Agilno"
                value="Agilno"
                onChange={handleChangeOrganization}
                checked={filterOrganization === "Agilno"}
              ></input>
            </div>
            <div>
              <label htmlFor="Info Bip">Info Bip</label>
              <input
                type="checkbox"
                id="Info Bip"
                value="Info Bip"
                onChange={handleChangeOrganization}
                checked={filterOrganization === "Info Bip"}
              ></input>
            </div>
            <div>
              <label htmlFor="Locastic">Locastic</label>
              <input
                type="checkbox"
                id="Locastic"
                value="Locastic"
                onChange={handleChangeOrganization}
                checked={filterOrganization === "Locastic"}
              ></input>
            </div>
          </div>
        </div>
        <div className="workshops">
          {lecturer.map((lc) => {
            if (
              (filterTheme === "All" ||
                lc.themes.find((theme) => theme.name === filterTheme)) &&
              (filterOrganization === "All" ||
                filterOrganization === lc.organization)
            ) {
              return (
                <LecturersEl
                  key={lc.id}
                  lecturer={lc}
                  setLecturer={setLecturer}
                  lecturers={lecturer}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
}

export default LecturersFilters;
