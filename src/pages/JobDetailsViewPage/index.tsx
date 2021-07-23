import React, {FunctionComponent, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import dayjs from 'dayjs';

import { Grid, Button, Box, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import type { JobPosting } from '../../types';
import { API } from '../../api';
import ViewPost from './ViewPost';

dayjs.extend(require('dayjs/plugin/relativeTime'));

const JobDetails: FunctionComponent = ({ }) => {
    const [ data, setData ] = useState<JobPosting | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);
    const history: History = useHistory();

    const fetchJobPosting = async (): Promise<void> => {
        try {
            const data = await API.jobPostings.loadJobPosting(history.location.pathname.split('/')[2]);
            setData(data.data);
            setLoading(false);
        } catch (e) {
            setError(true);
            setLoading(false);
        }
    };

    //@ts-ignore
    useEffect(() => {
        fetchJobPosting();

    }, []);

    const handleBackClick = (): void => {
      history.push('/');
    };

    return (
        <>
            <Grid container>
                <Button
                    color='primary'
                    onClick={handleBackClick}
                >
                    <KeyboardBackspaceIcon />
                    <Box ml={1}>Back to Postings</Box>
                </Button>
            </Grid>
            <Box mt={3} />
            {
                error && <Alert severity='error'>Unable to retrieve job posting. Please try again later. If issue persists, then contact the support team</Alert>
            }
            <Box mt={3} />
            {
                loading ?
                    <Grid
                        container
                        alignContent='center'
                        justifyContent='center'
                    >

                        <CircularProgress color='secondary' />
                    </Grid>
                    :
                    <ViewPost data={data} />
            }
        </>
    );
};

export default JobDetails;