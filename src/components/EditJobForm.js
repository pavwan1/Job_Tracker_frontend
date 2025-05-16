import React, { useState, useEffect } from "react";
import API from "../api"
import "../styles/Edit.css"

const EditJobForm = ({ job, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        company:'',
        position:'',
        status:'',
        applied_date:'',

    });

    useEffect(() => {
        if(job) {
            setFormData({
                company: job.company,
                position: job.position,
                status: job.status,
                applied_date: job.applied_date.split('T')[0] 
            });
        }
    }, [job]);


    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await API.put(`/jobs/${job.id}`, formData);
            const updatedJob = response.data.job

            if (updatedJob && updatedJob.id) {
              onUpdate(updatedJob);
            }
            
        }catch(error) {
            console.error("failed to update job", error)
        }
    };

      return (
    <form className="edit-job-form" onSubmit={handleSubmit}>
      <h2>Edit Job</h2>
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
        required
      />
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
        placeholder="Position"
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        type="date"
        name="applied_date"
        value={formData.applied_date}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Job</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditJobForm;