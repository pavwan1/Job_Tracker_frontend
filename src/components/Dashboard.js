import React, { useState, useEffect } from "react";
import API from '../api';
import JobCard from './JobCard';
import AddJobForm from './AddJobForm';
import EditJobForm from './EditJobForm';
import SearchBar from './SearchBar';
import Navbar from "./NavBar";
import "../styles/Dashboard.css"




const DashBoard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);



    useEffect(() => {
        const fetchJobs = async () => {
            try{
                const response = await API.get('/jobs');
                console.log('Full response:', response);
                console.log('Jobs from backend:', response.data);
                setJobs(response.data)
            }catch(error){
                console.log('Error  fetching in jobs', error);
            }
        };

        fetchJobs()
    }, []);

    const handleJobAdded = (newJob) => {
        console.log("Job added 👇", newJob);
        setJobs(prevJobs => [newJob, ...prevJobs]);
    };

    const handleUpdate = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      )
    );
    setSelectedJob(null); // 👈 close the form after update
  };

    const handleDelete = async (jobId) => {
        try {
            await API.delete(`/jobs/${jobId}`); // Send DELETE request to backend
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId)); // Remove job from state
        } catch (error) {
            console.error("Failed to delete job", error);
        }
        };



    return (
        <div className="dashboard-container">
            <div className="search-logout">
                <Navbar />
                <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            </div>
            <div className="jobs">
                <button 
                    onClick={() => setShowAddForm(!showAddForm)} 
                    style={{ margin: '10px', padding: '10px 20px' }}
                    >
                    {showAddForm ? 'Close Add Job Form' : 'Add New Job'}
                 </button>

            {showAddForm && <AddJobForm onJobAdded={handleJobAdded} />}
            {selectedJob ? (
                <EditJobForm
                job={selectedJob}
                onUpdate={handleUpdate}
                onCancel={() => setSelectedJob(null)}
                />
            ) : (
                <div className="job-list">
                {jobs
                    .filter((job) =>
                        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.position.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((job) => (
                        <JobCard key={job.id} job={job} onEdit={() => setSelectedJob(job)} onDelete={handleDelete} />
                    ))} 
                </div>
            )
            } 
            </div>  
        </div>
    );
};

export default DashBoard;