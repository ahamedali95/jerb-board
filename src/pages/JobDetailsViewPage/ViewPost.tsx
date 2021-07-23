import React, { FunctionComponent, useMemo } from 'react';
import dayjs from 'dayjs';

import { Grid, Typography, Avatar, Divider, Box, Chip, withStyles, createStyles, Theme, WithStyles, Link } from '@material-ui/core';

import type { JobPosting, Location } from '../../types';

dayjs.extend(require('dayjs/plugin/relativeTime'));

const viewPostStyles = (theme: Theme) => createStyles({
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

interface ViewPostProps extends WithStyles<typeof viewPostStyles> {
    data: JobPosting | null;
}

const ViewPost: FunctionComponent<ViewPostProps> = ({classes, data}) => {
    const getAddress = useMemo((): string => {
        const location: Location | undefined = data?.location;

        return location ? `${location?.name} ${location?.street_address_1} ${location?.street_address_2}, ${location?.city} ${location?.state} ${location?.zip_code}` : '';
    }, [data?.location]);

    return (
        <>
            <Grid
                container
                justifyContent='center'
            >
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
                            <Typography className={classes.title}>{data?.title}</Typography>
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
                        <Typography
                            variant='subtitle1'>{`${data?.location?.city || ''}, ${data?.location?.state || ''}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Chip
                            size='small'
                            label={data?.category?.name || ''}
                            color='primary'
                            variant='outlined'
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Box mt={3}/>
            <Divider/>
            <Box mt={1}/>
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
            <Box mt={1}/>
            <Divider/>
            <Box mt={1}/>
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
            <Box mt={1}/>
            <Divider/>
            <Box mt={1}/>
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
            <Box mt={1}/>
            <Divider/>
            <Box mt={3}/>
            <Typography variant='h6'>Description</Typography>
            <Typography variant='body2'>{data?.description}</Typography>
        </>
    );
};

export default withStyles(viewPostStyles)(ViewPost);