import React, { useState } from "react";
import API from "../api"
import '../styles/Addjobform.css';


const AddJobForm = ({onJobAdded}) => {
    const [formData, setFormData] = useState({
        company: '',
        position:'',
        status: '',
        applied_date: '',   
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response =  await API.post('/add', formData);
            const addedJob = response.data.Job; 

            if (addedJob && addedJob.id) {
                onJobAdded(addedJob);
            } else {
                console.error("Invalid job object returned", addedJob);
            }

            setFormData({company: '', position: '', status: '', applied_date: '' });
        }catch(error){
            console.error("Failed to add job", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-job-form">
            <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
            <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
            <input name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />
            <input type="date" name="applied_date" value={formData.applied_date} onChange={handleChange} required />
            <button type="submit">Add Job</button>
        </form>
    );

};


export default AddJobForm