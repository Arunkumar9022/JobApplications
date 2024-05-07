// components/JobCard.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const JobCard = ({ job }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{job.title}</Typography>
        <Typography variant="subtitle1">{job.company}</Typography>
        <Typography variant="body1">{job.location}</Typography>
        <Typography variant="body2" component="p">{job.description}</Typography>
        <Typography variant="body2">Experience: {job.experience}</Typography>
        <Button variant="contained" color="primary" style={{marginTop:"10px"}}>Apply</Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
