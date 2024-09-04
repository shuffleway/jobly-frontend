import JobCard from "./JobCard";
import "./JobCard.css"

const JobListCard = ({ jobs }) => {
    return (
      <div>
        {jobs.map((job) => (
           <JobCard 
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={job.companyName}
           />
        ))}
      </div>
    );
  };
  
  export default JobListCard;
  