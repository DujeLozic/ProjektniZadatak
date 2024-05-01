import axios from "axios";
import { useState, useEffect } from "react";
import { ILecturers, IOrganizationts, IWorkshops } from "../interface";
import AdminWsEl from "./components/AdminitrationComponents/AdminWsEl";
import AdminLcEl from "./components/AdminitrationComponents/AdminLcEl";
import AdminOrgEl from "./components/AdminitrationComponents/AdminOrgEl";
import "./Administration.css";

export const Administration = () => {
  const [workshop, setWorkshop] = useState<IWorkshops[]>([]);
  const [lecturer, setLecturer] = useState<ILecturers[]>([]);
  const [organization, setOrganization] = useState<IOrganizationts[]>([]);
  const [table, setTable] = useState("workshops");

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
    console.log(table);
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
          <button className="buttonNav">+ Dodaj</button>
        </nav>
      </div>
      <div>
        {table === "workshops"
          ? workshop.map((ws) => <AdminWsEl key={ws.id} workshop={ws} />)
          : table === "organizations"
          ? organization.map((org) => (
              <AdminOrgEl key={org.id} organization={org} />
            ))
          : table === "lecturers"
          ? lecturer.map((lc) => <AdminLcEl key={lc.id} lecturer={lc} />)
          : null}
      </div>
    </div>
  );
};
