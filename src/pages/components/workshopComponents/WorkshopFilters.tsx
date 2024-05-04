import { createContext, useState } from "react";
import { IWorkshops } from "../../../interface";
import WorkshopEl from "./WorkshopEl";
import "./WorkshopFilters.css";
import ModalNewWorkshop from "./ModalNewWorkshop";

function WorkshopsFilters({
  workshop,
  setWorkshop,
}: {
  workshop: IWorkshops[];
  setWorkshop: React.Dispatch<React.SetStateAction<IWorkshops[]>>;
}) {
  const UserContext = createContext("Admin");
  const [filterTheme, setFilterTheme] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [modalNewOpener, setModalNewOpener] = useState(false);

  const handleChangeTheme = (e: any) => {
    setFilterTheme(e.target.value);
  };

  const handleChangeDifficulty = (e: any) => {
    setFilterDifficulty(e.target.value);
  };

  const handleModalNewOpener = (e: boolean) => {
    setModalNewOpener(e);
  };

  const params = new URLSearchParams(window.location.search);

  return (
    <>
      {/* {UserContext === "Admin" && (
        
      )} */}
      <div className="workshopButtonContanier">
        <button
          className="newWorkshopButton"
          onClick={() => handleModalNewOpener(true)}
        >
          Dodaj novu radionicu
        </button>
      </div>
      {modalNewOpener && (
        <ModalNewWorkshop
          setWorkshop={setWorkshop}
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
            <p>Težina</p>
            <div>
              <label htmlFor="Junior">Junior</label>
              <input
                type="checkbox"
                id="Junior"
                value="Junior"
                onChange={handleChangeDifficulty}
                checked={filterDifficulty === "Junior"}
              ></input>
            </div>
            <div>
              <label htmlFor="Mid">Mid</label>
              <input
                type="checkbox"
                id="Mid"
                value="Mid"
                onChange={handleChangeDifficulty}
                checked={filterDifficulty === "Mid"}
              ></input>
            </div>
            <div>
              <label htmlFor="Senior">Senior</label>
              <input
                type="checkbox"
                id="Senior"
                value="Senior"
                onChange={handleChangeDifficulty}
                checked={filterDifficulty === "Senior"}
              ></input>
            </div>
          </div>
        </div>
        <div className="workshops">
          {workshop.map((ws) => {
            if (params.get("q")) {
              if (
                params.get("q") === ws.lecturer &&
                (filterTheme === "All" || filterTheme === ws.theme) &&
                (filterDifficulty === "All" ||
                  filterDifficulty === ws.difficulty)
              ) {
                return (
                  <WorkshopEl
                    key={ws.id}
                    workshop={ws}
                    setWorkshop={setWorkshop}
                    workshops={workshop}
                  />
                );
              } else {
                return null;
              }
            } else if (
              (filterTheme === "All" || filterTheme === ws.theme) &&
              (filterDifficulty === "All" || filterDifficulty === ws.difficulty)
            ) {
              return (
                <WorkshopEl
                  key={ws.id}
                  workshop={ws}
                  setWorkshop={setWorkshop}
                  workshops={workshop}
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

export default WorkshopsFilters;
