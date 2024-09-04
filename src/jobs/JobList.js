import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api/api";
import JobListCard from "./JobListCard";
import SearchForm from "../common/SearchForm";
import UserContext from "../auth/UserContext";

const JobList = () => {
  const [jobs, setJobs] = useState([]); 
  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate()

  
  useEffect(() => {
    if(!currentUser){
      navigate("/");
    } else{
      search();
    }
  }, [currentUser, navigate]);

  async function search(term) {
    try {
      const jobData = await JoblyApi.getJobs(term); 
      setJobs(jobData);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  }

  return (
    <div>
      <SearchForm searchFor={search} />
      <JobListCard jobs={jobs}/> 
    </div>
  );
}

export default JobList;


