import React from "react";
import "../styles/Jobcard.css" 

const JobCard = ({ job, onEdit, onDelete }) =>{

    console.log("Rendering job card with status:", job.status);

    return(
        <div className="job-card">   
            <h3>{job.position}</h3>
            <p><strong>Company:</strong> {job.company} </p>
            <p><strong>Status:</strong> {job.status} </p>
            <p><strong>Applied on:</strong> {job.applied_date} </p>
            <div>   
                <button className="edit-btn" onClick={() => onEdit(job)}>Edit</button>  
                <button className="delete-btn" onClick={() => onDelete(job.id)}>Delete</button>
            </div>
        </div>
    );
};


export default JobCard;