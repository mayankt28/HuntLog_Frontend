import API from './index';

export const getAllJobs = async () => {
  const res = await API.get('/jobs/');
  return res.data; 
};


export const getJobById = async (id) => {
  const res = await API.get(`/jobs/${id}`);
  return res.data; 
};


export const createJob = async (data) => {
  const res = await API.post('/jobs', data);
  return res.data; 
};


export const updateJob = async (id, data) => {
  const res = await API.put(`/jobs/${id}`, data);
  return res.data;
};


export const deleteJob = async (id) => {
  const res = await API.delete(`/jobs/${id}`);
  return res.data;
};


export const exportJobsCSV = (filters = {}) => {
  const mappedParams = {
    ...(filters.status && { status: filters.status }),
    ...(filters.tags && { tag: filters.tags }),      
    ...(filters.fromDate && { from: filters.fromDate }), 
    ...(filters.toDate && { to: filters.toDate }),      
  };

  return API.get('/jobs/export', {
    params: mappedParams,
    responseType: 'blob',
  });
};

