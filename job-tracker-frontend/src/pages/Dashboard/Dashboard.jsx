import React, { useEffect, useState, useMemo } from 'react';
import Card from '../../components/Card';
import { Modal } from '../../components/Modal';
import { Input, Select } from '../../components/FormElements';
import { Badge, Tag, Skeleton, EmptyState } from '../../components/DisplayComponent';
import { PrimaryButton, SecondaryButton, DangerButton } from '../../components/Button';
import { getAllJobs, createJob, updateJob, deleteJob, exportJobsCSV } from '../../api/jobs';
import { Pencil, Trash2 } from 'lucide-react';

const formatDate = (isoDateStr) => new Date(isoDateStr).toLocaleDateString();

const statusColorMap = {
  Applied: 'bg-yellow-500 text-black',
  Interviewing: 'bg-blue-600',
  Offered: 'bg-green-600',
  Rejected: 'bg-red-600',
  Saved: 'bg-gray-600',
};

const Dashboard = ({ searchQuery }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [jobBeingEdited, setJobBeingEdited] = useState(null);
  const [jobBeingDeleted, setJobBeingDeleted] = useState(null);

  const [newJob, setNewJob] = useState({
    company: '',
    position: '',
    location: '',
    status: 'Applied',
    applicationDate: '',
    jobPostingURL: '',
    notes: '',
    tags: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportFilters, setExportFilters] = useState({
    status: '',
    tags: '',
    fromDate: '',
    toDate: '',
  });

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (e) {
      setError(e.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    if (!searchQuery) return jobs;
    const q = searchQuery.toLowerCase();
    return jobs.filter(
      (job) =>
        job.position.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q)
    );
  }, [jobs, searchQuery]);

  const onNewJobChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newJob.company.trim()) errors.company = 'Company is required';
    if (!newJob.position.trim()) errors.position = 'Position is required';
    if (!newJob.applicationDate.trim()) errors.applicationDate = 'Application date is required';
    return errors;
  };

  const submitNewJob = async () => {
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    const payload = {
      ...newJob,
      tags: newJob.tags.split(',').map((t) => t.trim()).filter(Boolean),
      notes: newJob.notes.split('\n').map((n) => n.trim()).filter(Boolean),
    };

    try {
      if (isEditMode && jobBeingEdited) {
        await updateJob(jobBeingEdited._id, payload);
      } else {
        await createJob(payload);
      }

      await fetchJobs();
      closeJobModal();
    } catch (e) {
      alert(e.message || 'Failed to save job');
    }
  };

  const onExportSubmit = async () => {
    try {
      const response = await exportJobsCSV(exportFilters); 
      const url = window.URL.createObjectURL(new Blob([response.data])); 
      const a = document.createElement('a');
      a.href = url;
      a.download = 'jobs_export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      setIsExportOpen(false);
    } catch (e) {
      alert(e.message || 'Failed to export jobs');
    }
  };

  const openEditModal = (job) => {
    setIsEditMode(true);
    setJobBeingEdited(job);
    setNewJob({
      ...job,
      tags: job.tags.join(', '),
      notes: job.notes.join('\n'),
    });
    setIsAddModalOpen(true);
  };

  const openDeleteModal = (job) => {
    setJobBeingDeleted(job);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteJob = async () => {
    try {
      await deleteJob(jobBeingDeleted._id);
      await fetchJobs();
      setIsDeleteModalOpen(false);
      setJobBeingDeleted(null);
    } catch (e) {
      alert(e.message || 'Failed to delete job');
    }
  };

  const closeJobModal = () => {
    setIsAddModalOpen(false);
    setIsEditMode(false);
    setJobBeingEdited(null);
    setNewJob({
      company: '',
      position: '',
      location: '',
      status: 'Applied',
      applicationDate: '',
      jobPostingURL: '',
      notes: '',
      tags: '',
    });
    setFormErrors({});
  };

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col min-h-[80vh] rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-pixel text-discord-primary">Your Jobs</h1>
        <div className="flex space-x-2">
          {jobs.length > 0 && (
            <div className="relative">
              <PrimaryButton onClick={() => setIsExportOpen((open) => !open)}>Export CSV</PrimaryButton>
              {isExportOpen && (
                <div className="absolute right-0 mt-2 p-4 bg-discord-dark rounded-md shadow-lg w-80 max-w-sm z-20">
                  <Select label="Status" name="status" value={exportFilters.status} onChange={(e) => setExportFilters((f) => ({ ...f, status: e.target.value }))} options={[
                    { value: '', label: 'All' },
                    { value: 'Applied', label: 'Applied' },
                    { value: 'Interviewing', label: 'Interviewing' },
                    { value: 'Offered', label: 'Offered' },
                    { value: 'Rejected', label: 'Rejected' },
                    { value: 'Saved', label: 'Saved' },
                  ]} />
                  <Input label="Tags (comma separated)" name="tags" value={exportFilters.tags} onChange={(e) => setExportFilters((f) => ({ ...f, tags: e.target.value }))} />
                  <Input label="From Date" name="fromDate" type="date" value={exportFilters.fromDate} onChange={(e) => setExportFilters((f) => ({ ...f, fromDate: e.target.value }))} />
                  <Input label="To Date" name="toDate" type="date" value={exportFilters.toDate} onChange={(e) => setExportFilters((f) => ({ ...f, toDate: e.target.value }))} />
                  <div className="flex justify-end space-x-2 mt-3">
                    <SecondaryButton onClick={() => setIsExportOpen(false)}>Cancel</SecondaryButton>
                    <PrimaryButton onClick={onExportSubmit}>Download</PrimaryButton>
                  </div>
                </div>
              )}
            </div>
          )}
          <PrimaryButton onClick={() => setIsAddModalOpen(true)}>Add New Job</PrimaryButton>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} widthClass="w-full" heightClass="h-48" roundedClass="rounded-lg" />
          ))}
        </div>
      )}

      {error && <div className="text-red-500 text-center mb-4 font-pixel">Error loading jobs: {error}</div>}

      {!loading && filteredJobs.length === 0 && (
        <EmptyState
          title="No Jobs Found"
          message="You have no jobs matching the current filters or search."
          buttonText="Add Your First Job"
          onButtonClick={() => setIsAddModalOpen(true)}
        />
      )}

      {!loading && filteredJobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card
              key={job._id}
              header={`${job.position} @ ${job.company}`}
              body={
                <>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Applied:</strong> {formatDate(job.applicationDate)}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                </>
              }
              footer={
                <div className="flex justify-between items-center">
                  <Badge colorClass={statusColorMap[job.status] || 'bg-gray-600'}>
                    {job.status}
                  </Badge>
                  <div className="flex gap-4 items-center">
                    <Pencil
                      className="w-5 h-5 text-white cursor-pointer hover:text-discord-primary"
                      onClick={() => openEditModal(job)}
                    />
                    <Trash2
                      className="w-5 h-5 text-white cursor-pointer hover:text-red-500"
                      onClick={() => openDeleteModal(job)}
                    />
                  </div>
                </div>
              }
              className="cursor-default"
              interactive='true'
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={closeJobModal}
        title={isEditMode ? 'Edit Job' : 'Add New Job'}
        footer={
          <>
            <SecondaryButton onClick={closeJobModal}>Cancel</SecondaryButton>
            <PrimaryButton onClick={submitNewJob}>{isEditMode ? 'Save Changes' : 'Add Job'}</PrimaryButton>
          </>
        }
      >
        <Input label="Company" name="company" value={newJob.company} onChange={onNewJobChange} error={formErrors.company} required />
        <Input label="Position" name="position" value={newJob.position} onChange={onNewJobChange} error={formErrors.position} required />
        <Input label="Location" name="location" value={newJob.location} onChange={onNewJobChange} />
        <Select label="Status" name="status" value={newJob.status} onChange={onNewJobChange} options={[
          { value: 'Applied', label: 'Applied' },
          { value: 'Interviewing', label: 'Interviewing' },
          { value: 'Offered', label: 'Offered' },
          { value: 'Rejected', label: 'Rejected' },
          { value: 'Saved', label: 'Saved' },
        ]} />
        <Input label="Application Date" name="applicationDate" type="date" value={newJob.applicationDate} onChange={onNewJobChange} error={formErrors.applicationDate} required />
        <Input label="Job Posting URL" name="jobPostingURL" type="url" value={newJob.jobPostingURL} onChange={onNewJobChange} />
        <Input label="Tags (comma separated)" name="tags" value={newJob.tags} onChange={onNewJobChange} />
        <Input label="Notes (separate with new lines)" name="notes" value={newJob.notes} onChange={onNewJobChange} as="textarea" />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <>
            <SecondaryButton onClick={() => setIsDeleteModalOpen(false)}>Cancel</SecondaryButton>
            <DangerButton onClick={confirmDeleteJob}>Delete</DangerButton>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{jobBeingDeleted?.position}</strong> at <strong>{jobBeingDeleted?.company}</strong>?</p>
      </Modal>
    </div>
  );
};

export default Dashboard;
