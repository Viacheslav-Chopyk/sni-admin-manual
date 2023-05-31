export interface IUser {
  business: IBusiness[];
  email: string;
  fullName: string;
  id: string;
  phone: string;
  type: ITypePlan;
}

interface ITypePlan {
  name: string;
  wordsLimit: number;
}

export interface IBusiness {
  region: string;
  regNumber: string;
  legalName: string;
  logo: ILogo;
  logoId: string;
  id: string | number;
  brands: IBrands[];
  category: string[];
  general: IGeneralKey;
  information: Iinformation;
  interesting: Iinteresting;
}

interface IGeneralKey {
  facebookGroups: string[];
  keywords: string[];
}
interface Iinteresting {
  facebookGroups: string[];
  products: string[];
}
interface Iinformation {
  facebookGroups: string[];
  websites: string[];
}
interface ILogo  {
  name: string;
  path: string;
}

interface IBrands {
  // competitorsSites: string[];
  // facebookGroups: string[];
  // facebookPages: string[];
  // keywords: string[];
  name: string;
  keywords: string[];
}
