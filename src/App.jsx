import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, CircularProgress, TextField, Button } from '@mui/material';
import JobCard from './components/JobCard';
import { setFilters, addJobs } from '../src/components/Store/action';
import '../src/App.css';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const filters = useSelector((state) => state.filters);
  const jobs = useSelector((state) => state.jobs);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const newJobs = await fetchJobsFromAPI(filters, page);
      dispatch(addJobs(newJobs));
      setLoading(false);

      if (newJobs.length === 0) {
        setHasMore(false);
      }
    };
    fetchJobs();
  }, [filters, page, dispatch]);

  const fetchJobsFromAPI = (filters, page) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockJobs = generateMockJobs(page); 
        resolve(mockJobs);
      }, 1000);
    });
  };

  const generateMockJobs = (page) => {

    const startIndex = (page - 1) * 10; 
    const endIndex = startIndex + 10;
    const mockJobs = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < MOCK_JOB_DATA.length) {
        mockJobs.push(MOCK_JOB_DATA[i]);
      }
    }
    return mockJobs;
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !loading && hasMore) {
      setPage(page + 1); 
    }
  };

  const handleFilterChange = (filterKey, value) => {
    dispatch(setFilters({ ...filters, [filterKey]: value }));
    setPage(1); 
  };

  const MOCK_JOB_DATA = [
    { title: 'Software Engineer', company: 'ABC Corp', location: 'New York', description: 'Lorem ipsum...', experience: '2+ years' },
    { title: 'Frontend Developer', company: 'XYZ Inc', location: 'San Francisco', description: 'Lorem ipsum...', experience: '3+ years' },
  ];

  return (
    <Container>
      <h1 className="heading">Job Listings</h1>
      <div className="filters">
        <TextField
          className="filterInput"
          label="Minimum Experience"
          type="number"
          value={filters.minExperience}
          onChange={(e) => handleFilterChange('minExperience', e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={() => setPage(1)}>Apply Filters</Button>
      </div>
      <Grid container spacing={3} onScroll={handleScroll} className="jobGrid">
        {jobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress />}
      {!hasMore && <p>No more jobs available</p>}
    </Container>
  );
};

export default App;


