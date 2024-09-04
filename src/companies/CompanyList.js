import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../common/SearchForm";
import UserContext from "../auth/UserContext";


const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else if (currentUser) {
      search();
    }
  }, [currentUser, navigate]);

  async function search(term) {
    try {
      const companyData = await JoblyApi.getCompanies(term);
      setCompanies(companyData);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  }

  return (
    <div>
      <SearchForm searchFor={search} />

      {companies.map(company => (
        <CompanyCard 
          key={company.handle}
          handle={company.handle}
          name={company.name}
          description={company.description}
          numEmployees={company.numEmployees}
          logoUrl={company.logoUrl}
        />
      ))}
    </div>
  );
};

export default CompanyList;
