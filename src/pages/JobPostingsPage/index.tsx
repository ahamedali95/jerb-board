import React, { useState, FunctionComponent, useEffect } from 'react';

import { API } from '../../api';
import { JobPosting } from '../../types';
import JobPostings from './JobPostings';
import {currentListing} from "../../redux/listingStatus";
import {connect} from "react-redux";

type JobPostingsPageProps = {
  onJobClick: (val: string | null) => unknown;
};

const JobPostingsPage: FunctionComponent<JobPostingsPageProps> = ({ onJobClick }) => {
  const [ jobPostings, setJobPostings ] = useState<JobPosting[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  const handleJobClick = (id: string): void => {
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
              <p>loading</p>
              :
              <>
                <h1>Job Postings</h1>
                <JobPostings
                    jobPostings={jobPostings}
                    onJobClick={handleJobClick}
                />
              </>
        }
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onJobClick: (val: string | null) => {
      dispatch(currentListing(val))
    }
  };
};

export default connect(null, mapDispatchToProps)(JobPostingsPage);
