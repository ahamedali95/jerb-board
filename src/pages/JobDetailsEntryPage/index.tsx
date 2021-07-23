import React, {FunctionComponent, useReducer, useCallback, useEffect} from 'react';
import { Typography, Divider, Box, withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import {connect} from 'react-redux';
import { useHistory } from 'react-router';
import { History } from 'history';

import CreatePost from './CreatePost';
import {createPostReducer} from '../reducers';
import { InitialState as CreatePostState, initialState} from '../reducers/createPostReducer';
import { fetchAdditionalJobDetails } from '../../redux/actions/asyncActions';
import { InitialState as JobDetails } from '../../redux/reducers/jobDetails';
import {API} from '../../api';

const jobDetailsEntryPageStyles = (theme: Theme) => createStyles({
    topDivider: {
        height: theme.spacing(0.4)
    }
});

interface JobDetailsEntryPageProps extends WithStyles<typeof jobDetailsEntryPageStyles> {
    fetchJobDetails: (property: keyof JobDetails, func: any) => unknown;
    jobDetails: JobDetails;
}

const JobDetailsEntryPage: FunctionComponent<JobDetailsEntryPageProps> = ({ classes, fetchJobDetails, jobDetails }) => {
    const [ state, dispatch ] = useReducer(createPostReducer, initialState, undefined);
    const history: History = useHistory();

    useEffect(() => {
        fetchJobDetails('locations', API.locations.loadAll);
        fetchJobDetails('posters', API.jobPosters.loadAll);
        fetchJobDetails('categories', API.categories.loadAll);
    }, []);

    const handleChange = useCallback((property: keyof CreatePostState, value: any): void => {
        dispatch({ type: 'UPDATE_PROPERTY', property, value });
    }, [ dispatch ]);

    const handleResetClick = useCallback((): void => {
        dispatch({ type: 'RESET' });
    }, [ dispatch ]);

    const handlePostClick = useCallback(async (): Promise<void> => {
        const { data } = await API.jobPostings.createJobPosting(state);
        history.push('/');

    }, [ state ]);

    console.log(state)

    return (
        <>
            <Typography variant='h4'>Enter Details</Typography>
            <Box mt={2} />
            <Divider className={classes.topDivider} />
            <Box mt={2} />
            <Typography variant='body2'>This information will be shown to job seekers</Typography>
            <Box mt={3} />
            <CreatePost
                data={state}
                onChange={handleChange}
                onResetClick={handleResetClick}
                onPostClick={handlePostClick}
                additionalPostDetails={jobDetails}
            />
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        jobDetails: state.jobDetails
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchJobDetails: (property: keyof JobDetails, func: any) => {
            dispatch(fetchAdditionalJobDetails(property, func))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(jobDetailsEntryPageStyles)(JobDetailsEntryPage));