import React, { useState, FunctionComponent, useEffect } from 'react';
import {connect} from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { History } from 'history';
import { useHistory } from 'react-router';

import { API } from '../../api';
import { JobPosting } from '../../types';
import JobPostings from './JobPostings';
import { currentPosting } from '../../redux/reducers/postingStatus';


type JobPostingsPageProps = {
  onJobClick: (val: number) => unknown;
};

const JobPostingsPage: FunctionComponent<JobPostingsPageProps> = ({ onJobClick }) => {
  const [ jobPostings, setJobPostings ] = useState<JobPosting[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const history: History = useHistory();

  const handleJobClick = (id: number): void => {
    onJobClick(id);
  };

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
                <JobPostings
                    jobPostings={jobPostings}
                    onJobClick={handleJobClick}
                />
              </>
        }
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onJobClick: (val: number) => {
      dispatch(currentPosting(val))
    }
  };
};

export default connect(null, mapDispatchToProps)(JobPostingsPage);
