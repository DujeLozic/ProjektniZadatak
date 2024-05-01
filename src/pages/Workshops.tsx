import { useEffect, useState } from "react";
import { IWorkshops } from "../interface";
import axios from "axios";
import WorkshopFilters from "./components/workshopComponents/WorkshopFilters";

function Workshops() {
  const [workshop, setWorkshop] = useState<IWorkshops[]>([]);

  useEffect(() => {
    axios
      .get<IWorkshops[]>("http://localhost:3001/workshops")
      .then((res) => setWorkshop(res.data));
  }, []);

  return (
    <div>
      <WorkshopFilters workshop={workshop} setWorkshop={setWorkshop} />
    </div>
  );
}

export default Workshops;
