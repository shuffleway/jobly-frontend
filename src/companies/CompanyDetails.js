import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobListCard from "../jobs/JobListCard";

const CompanyDetails = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
      } catch (error) {
        console.error("Company not found", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompany();
  }, [handle]);

  if (loading) return <p>Loading...</p>;
  if (!company) return <p>Company not found</p>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      {company.jobs.length > 0 ? (
        <JobListCard jobs={company.jobs} />
      ) : (
        <p>No jobs available for this company.</p>
      )}
    </div>
  );
};

export default CompanyDetails;
