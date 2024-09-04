import { Link } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ handle, name, description, numEmployees, logoUrl }) => {
  return (
    <Link to={`/companies/${handle}`} className="CompanyCard Card">
      <div className="CompanyCard-body">
        <h3 className="CompanyCard-title">
          {name}
          {logoUrl && (
            <img
              src={logoUrl}
              alt={name}
              className="float-right ml-5"
            />
          )}
        </h3>
        <p>{description}</p>
        <p>Number Of Employees: {numEmployees}</p>
      </div>
    </Link>
  );
};

export default CompanyCard;
