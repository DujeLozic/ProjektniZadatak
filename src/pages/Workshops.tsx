import { useEffect, useState } from "react";
import { IWorkshops } from "../interface";
import axios from "axios";
import WorkshopFilters from "./components/workshopComponents/WorkshopFilters";
import { ClipLoader } from "react-spinners";
import "./Workshop.css";

function Workshops() {
  const [workshop, setWorkshop] = useState<IWorkshops[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get<IWorkshops[]>("http://localhost:3001/workshops").then((res) => {
      setTimeout(() => {
        setWorkshop(res.data);
        setLoading(false);
      }, 1000);
    });
  }, []);

  return (
    <div>
      {loading === false ? (
        <WorkshopFilters workshop={workshop} setWorkshop={setWorkshop} />
      ) : (
        <div className="loaderContainer">
          <ClipLoader />
        </div>
      )}
    </div>
  );
}

export default Workshops;
