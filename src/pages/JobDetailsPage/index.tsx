import React, {FunctionComponent, useState, useMemo, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Grid, Typography, Avatar, Divider, Button, Box, Chip, withStyles, createStyles, Theme, WithStyles, Link } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import type {JobPosting, Location} from "../../types";
import { currentListing } from '../../redux/listingStatus';

import dayjs from 'dayjs';
import {History} from "history";
import {connect} from "react-redux";
import {API} from "../../api";
dayjs.extend(require('dayjs/plugin/relativeTime'));


const $data = {
    "id": 1,
    "title": "Maven Unicorn",
    "status": "New Post",
    "description": "Hoodie pour-over iceland raclette poke bitters. Lyft man bun ennui subway tile pop-up. Vinyl iPhone keffiyeh, edison bulb put a bird on it flannel hoodie fixie pour-over art party",
    "posted_at": "2020-12-04T01:03:19.551Z",
    "category": {
        "id": 1,
        "name": "Computers"
    },
    "location": {
        "id": 1,
        "name": "Gnar HQ",
        "street_address_1": "19 Kingston Street",
        "street_address_2": '',
        "city": "Boston",
        "state": "MA",
        "zip_code": "02111"
    },
    "job_poster": {
        "id": 1,
        "full_name": "Bill Evans"
    }
};

const jobDetailsStyles = (theme: Theme) => createStyles({
    title: {
        lineHeight: '1.25em',
        fontSize: '25px',
        //@ts-ignore
        fontWeight: '700'
    },
    logo: {
        width: theme.spacing(8),
        height: theme.spacing(10)
    }
});

interface JobDetailsProps extends WithStyles<typeof jobDetailsStyles> {
    currentListing: string;
    resetCurrentListing: () => unknown;
}

const JobDetails: FunctionComponent<JobDetailsProps> = ({ classes, currentListing, resetCurrentListing }) => {
    const [ data, setData ] = useState<JobPosting | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const history: History = useHistory();

    console.log(currentListing)

    const fetchJobListing = async (): Promise<void> => {
        const data = await API.jobPostings.loadJobListing(currentListing);

        setData(data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchJobListing();

        return () => resetCurrentListing();
    }, []);

    const handleBackClick = (): void => {
      history.push('/');
    };

    const getAddress = useMemo((): string => {
        const location: Location | undefined = data?.location;

        return `${location?.name} ${location?.street_address_1} ${location?.street_address_2}, ${location?.city} ${location?.state} ${location?.zip_code}`;
    }, [ data?.location ]);

    console.log(data)

    return (
        <>
            {
                loading ?
                    <p>Loading</p>
                    :
                    <>
                        <Grid container>
                            <Button
                                color='primary'
                                onClick={handleBackClick}
                            >
                                <KeyboardBackspaceIcon />
                                <Box ml={1}>Back to listings</Box>
                            </Button>
                        </Grid>
                        <Box mt={3} />
                        <Grid container>
                            <Grid
                                item
                                xs={1}
                            >
                                {/* Company Logo */}
                                <Avatar
                                    className={classes.logo}
                                    variant='square'
                                >
                                    C
                                </Avatar>
                            </Grid>
                            <Grid
                                container
                                item
                                direction='column'
                                xs={11}
                            >
                                <Grid
                                    container
                                    item
                                    justifyContent='space-between'
                                >
                                    <Grid item>
                                        <Typography className={classes.title}>{data.title}</Typography>
                                    </Grid>
                                    <Grid item>
                                        {
                                            data?.status === 'New Post' &&
                                                <Chip
                                                  label='New!'
                                                  color='primary'
                                                />
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant='subtitle1'>{`${data?.location?.city || ''}, ${data?.location?.state || ''}`}</Typography>
                                </Grid>
                                <Grid item>
                                    <Chip
                                        size='small'
                                        label={data?.category?.name || ''}
                                        color="primary"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box mt={3} />
                        <Divider />
                        <Box mt={1} />
                        <Grid
                            container
                            justifyContent='space-between'
                        >
                            <Grid item>
                                <Typography>Posted</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{(dayjs() as any).to(dayjs(data?.posted_at))}</Typography>
                            </Grid>
                        </Grid>
                        <Box mt={1} />
                        <Divider />
                        <Box mt={1} />
                        <Grid
                            container
                            justifyContent='space-between'
                        >
                            <Grid item>
                                <Typography>Posted By</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{data?.job_poster?.full_name}</Typography>
                            </Grid>
                        </Grid>
                        <Box mt={1} />
                        <Divider />
                        <Box mt={1} />
                        <Grid
                            container
                            justifyContent='space-between'
                        >
                            <Grid item>
                                <Typography>Location</Typography>
                            </Grid>
                            <Grid item>
                                <Link href={`https://maps.google.com/?q=${getAddress}`}>{getAddress}</Link>
                            </Grid>
                        </Grid>
                        <Box mt={1} />
                        <Divider />
                        <Box mt={3} />
                        <Typography variant='h6'>Description</Typography>
                        <Typography variant='body2'>{data?.description}</Typography>
                    </>
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        currentListing: state.listingStatus.currentListing
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetCurrentListing: () => {
            dispatch(currentListing(null))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(jobDetailsStyles)(JobDetails));