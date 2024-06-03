import { useRouter } from "next/router";

export interface SearchFilters {
  name:string;
  type: string;
  remoteType: string;
  department: string;
  experience: string;
}

export const handleSearch = (filters: SearchFilters) => {
  const {name, type, remoteType, department, experience } = filters;

  const searchFilters = {
    name,
    type,
    remoteType,
    department,
    experience,
  };

  console.log("Searching with filters:", searchFilters);

  return searchFilters;
};
