import axios from "axios";
import { useState, useEffect } from "react";
import {
  IApplicants,
  ILecturers,
  IOrganizationts,
  IWorkshops,
} from "../interface";
import AdminWsEl from "./components/AdministrationComponents/AdminWsEl";
import AdminLcEl from "./components/AdministrationComponents/AdminLcEl";
import AdminOrgEl from "./components/AdministrationComponents/AdminOrgEl";
import "./Administration.css";
import ModalNewWorkshop from "./components/workshopComponents/ModalNewWorkshop";
import ModalNewLecturer from "./components/LecturersComponents/ModalNewLecturer";
import ModalNewOrganization from "./components/AdministrationComponents/ModalNewOrganization";
import AdminAppEl from "./components/AdministrationComponents/AdminAppEl";

export const Administration = () => {
  const [workshop, setWorkshop] = useState<IWorkshops[]>([]);
  const [lecturer, setLecturer] = useState<ILecturers[]>([]);
  const [organization, setOrganization] = useState<IOrganizationts[]>([]);
  const [applicant, setApplicant] = useState<IApplicants[]>([]);
  const [table, setTable] = useState("workshops");
  const [modalNewOpener, setModalNewOpener] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get<IWorkshops[]>("http://localhost:3001/workshops/"),
      axios.get<ILecturers[]>("http://localhost:3001/lecturers"),
      axios.get<IOrganizationts[]>("http://localhost:3001/organizations"),
      axios.get<IApplicants[]>("http://localhost:3001/applicants"),
    ])
      .then(([resWorkshop, resLecturers, resOrganizations, resApplicants]) => {
        setWorkshop(resWorkshop.data);
        setLecturer(resLecturers.data);
        setOrganization(resOrganizations.data);
        setApplicant(resApplicants.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleTable = (e: string) => {
    setTable(e);
  };

  const handleModalNewOpener = (e: boolean) => {
    setModalNewOpener(e);
  };

  const handleNewElemenet = () => {
    if (table === "workshops") {
      setModalNewOpener(true);
    } else if (table === "organizations") {
      setModalNewOpener(true);
    } else if (table === "lecturers") {
      setModalNewOpener(true);
    } else if (table === "applications") {
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
          <p className="appNav" onClick={() => handleTable("applications")}>
            Prijave
          </p>
          {table != "applications" && (
            <button className="buttonNav" onClick={handleNewElemenet}>
              + Dodaj
            </button>
          )}
        </nav>
        {modalNewOpener && (
          <>
            {table === "workshops" && (
              <ModalNewWorkshop
                setWorkshop={setWorkshop}
                handleModalNewOpener={handleModalNewOpener}
              />
            )}
            {table === "organizations" && (
              <ModalNewOrganization
                setOrganization={setOrganization}
                handleModalNewOpener={handleModalNewOpener}
              />
            )}
            {table === "lecturers" && (
              <ModalNewLecturer
                setLecturer={setLecturer}
                handleModalNewOpener={handleModalNewOpener}
              />
            )}
          </>
        )}
      </div>
      <div>
        {table === "workshops"
          ? workshop.map((ws) => (
              <AdminWsEl
                key={ws.id}
                workshop={ws}
                setWorkshop={setWorkshop}
                workshops={workshop}
              />
            ))
          : table === "organizations"
          ? organization.map((org) => (
              <AdminOrgEl
                key={org.id}
                organization={org}
                setOrganization={setOrganization}
                organizations={organization}
              />
            ))
          : table === "lecturers"
          ? lecturer.map((lc) => (
              <AdminLcEl
                key={lc.id}
                lecturer={lc}
                setLecturer={setLecturer}
                lecturers={lecturer}
              />
            ))
          : table === "applications"
          ? applicant.map((app) => (
              <AdminAppEl
                workshops={workshop}
                key={app.id}
                applicant={app}
                setApplicant={setApplicant}
                applicants={applicant}
              />
            ))
          : null}
      </div>
    </div>
  );
};
