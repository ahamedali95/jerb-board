import React, { useState, FunctionComponent, useEffect } from 'react';

import { API } from '../../api';
import { JobPosting } from '../../types';
import { JobPostings } from './JobPostings';

const JobPostingsPage: FunctionComponent = (props) => {
  const [ jobPostings, setJobPostings ] = useState<JobPosting[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  const fetchJobPostings = async () => {
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
              <p>loading</p>
              :
              <>
                <h1>Job Postings</h1>
                <JobPostings jobPostings={jobPostings} />
              </>
        }
    </>
  );
};

export default JobPostingsPage;
