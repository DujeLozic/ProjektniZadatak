import axios from "axios";
import { useState, useEffect } from "react";
import { ILecturers, IOrganizationts, IWorkshops } from "../interface";
import AdminWsEl from "./components/AdministrationComponents/AdminWsEl";
import AdminLcEl from "./components/AdministrationComponents/AdminLcEl";
import AdminOrgEl from "./components/AdministrationComponents/AdminOrgEl";
import "./Administration.css";
import ModalNewWorkshop from "./components/workshopComponents/ModalNewWorkshop";
import ModalNewLecturer from "./components/LecturersComponents/ModalNewLecturer";
import ModalNewOrganization from "./components/AdministrationComponents/ModalNewOrganization";

export const Administration = () => {
  const [workshop, setWorkshop] = useState<IWorkshops[]>([]);
  const [lecturer, setLecturer] = useState<ILecturers[]>([]);
  const [organization, setOrganization] = useState<IOrganizationts[]>([]);
  const [table, setTable] = useState("workshops");
  const [modalNewOpener, setModalNewOpener] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get<IWorkshops[]>("http://localhost:3001/workshops/"),
      axios.get<ILecturers[]>("http://localhost:3001/lecturers"),
      axios.get<IOrganizationts[]>("http://localhost:3001/organization"),
    ])
      .then(([resWorkshop, resLecturers, resOrganizations]) => {
        setWorkshop(resWorkshop.data);
        setLecturer(resLecturers.data);
        setOrganization(resOrganizations.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleTable = (e: string) => {
    setTable(e);
  };

  const handleModalNewOpener = () => {
    setModalNewOpener(!modalNewOpener);
  };

  const handleNewElemenet = () => {
    if (table === "workshops") {
      setModalNewOpener(true);
    } else if (table === "organizations") {
      setModalNewOpener(true);
    } else if (table === "lecturers") {
      setModalNewOpener(true);
    }
  };

  return (
    <div className="administrationContainer">
      <div>
        <nav className="administrationNav">
          <p className="wsNav" onClick={() => handleTable("workshops")}>
            Radionice
          </p>
          <p className="orgNav" onClick={() => handleTable("organizations")}>
            Organizacije
          </p>
          <p className="lcNav" onClick={() => handleTable("lecturers")}>
            Predavači
          </p>
          <button className="buttonNav" onClick={handleNewElemenet}>
            + Dodaj
          </button>
        </nav>
        {modalNewOpener && (
          <>
            {table === "workshops" && (
              <ModalNewWorkshop
                setWorkshop={setWorkshop}
                setModalNewOpener={setModalNewOpener}
              />
            )}
            {table === "organizations" && (
              <ModalNewOrganization
                setOrganization={setOrganization}
                setModalNewOpener={setModalNewOpener}
              />
            )}
            {table === "lecturers" && (
              <ModalNewLecturer
                setLecturer={setLecturer}
                setModalNewOpener={setModalNewOpener}
              />
            )}
          </>
        )}
      </div>
      <div>
        {table === "workshops"
          ? workshop.map((ws) => <AdminWsEl key={ws.id} workshop={ws} />)
          : table === "organizations"
          ? organization.map((org) => (
              <AdminOrgEl key={org.id} organization={org} />
            ))
          : table === "lecturers"
          ? lecturer.map((lc) => <AdminLcEl lecturer={lc} />)
          : null}
      </div>
    </div>
  );
};
