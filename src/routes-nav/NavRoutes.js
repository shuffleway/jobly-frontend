import { Navigate, Route, Routes } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetails from "../companies/CompanyDetails";
import JobList from "../jobs/JobList";
import ProfileForm from "../profile/ProfileForm";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";


const NavRoutes = ({login, signup}) => {
    return (
       <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginForm login={login}/>}/>
            <Route path="/signup" element={<SignupForm signup={signup}/>}/>
            <Route path="/companies" element={<CompanyList />}/>
            <Route path="/companies/:handle" element={<CompanyDetails />}/>
            <Route path="/jobs" element={ <JobList />} />
            <Route path="/profile" element={ <ProfileForm />}/>  
            <Route path="*" element={<Navigate to="/" />}/>    
          </Routes>     
       </div>
    )
}

export default NavRoutes;