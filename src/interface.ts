export interface IWorkshops {
  id: string;
  name: string;
  date: string;
  lecturer: string;
  description: string;
  theme: string;
  difficulty: string;
  number_of_aplications: number;
}

export interface ILecturers {
  id: string;
  name: string;
  bio: string;
  themes: IThemes[];
  organization: string;
}

export interface IOrganizationts {
  id: string;
  name: string;
  description: string;
  workshop: string;
}

export interface IDifficultys {
  id: string;
  name: string;
}

export interface IThemes {
  id: string;
  name: string;
}

export interface IApplicants {
  id: string;
  name: string;
  email: string;
  reason: string;
  workshop: string;
}
