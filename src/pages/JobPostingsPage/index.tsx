import React, { useState, FunctionComponent, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { History } from 'history';

import { API } from '../../api';
import { JobPosting } from '../../types';
import JobPostings from './JobPostings';

const JobPostingsPage: FunctionComponent = () => {
  const [ jobPostings, setJobPostings ] = useState<JobPosting[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const history: History = useHistory();

  const fetchJobPostings = async (): Promise<void> => {
    const data = await API.jobPostings.loadAll();

    setJobPostings(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  return (
      <>
        {
          loading ?
              <p>Loading...</p>
              :
              <>
                <Grid
                    container
                    justifyContent='space-between'
                >
                  <Grid item>
                    <h1>Job Postings</h1>
                  </Grid>
                  <Grid item>
                    <Button
                        onClick={() => history.push('/job_postings/new')}
                        color='secondary'
                        variant='outlined'
                    >
                      Create Job Posting
                    </Button>
                  </Grid>
                </Grid>
                <JobPostings jobPostings={jobPostings} />
              </>
        }
    </>
  );
};

export default JobPostingsPage;
