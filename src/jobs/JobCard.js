import React, { useEffect, useContext, useState } from "react";
import UserContext from "../auth/UserContext";

const JobCard = ({ id, title, salary, equity, companyName }) => {
    const {hasAppliedToJob, applyToJob } = useContext(UserContext);

    const [applied, setApplied] = useState(false);

    // Set initial applied state based on whether the user has already applied
    useEffect(() => {
        if (hasAppliedToJob(id)) {
            setApplied(true);
        }
    }, [id, hasAppliedToJob]);

    async function handleJobApplication() {
        if (!applied) {
            try {
                await applyToJob(id);
                setApplied(true);
            } catch (error) {
                console.error("Application failed:", error);
            }
        }
    }

    return (
        <div className="JobCard">
            <h3>{title}</h3>
            <p>{companyName}</p>
            <p>Salary: {salary ? `$${salary}` : "N/A"}</p>
            <p>Equity: {equity ? `${equity}%` : "N/A"}</p>
            <button 
              onClick={handleJobApplication} 
              disabled={applied}
              className={applied ? 'applied' : 'apply'}
            >
                {applied ? "Applied" : "Apply"}
            </button>
        </div>
    );
};

export default JobCard;
