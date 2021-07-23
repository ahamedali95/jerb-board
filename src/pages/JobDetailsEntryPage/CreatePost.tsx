import React, {ChangeEvent, FunctionComponent, useMemo} from 'react';
import {
    Grid, TextField, Button, withStyles, createStyles, Theme, WithStyles, Select, InputLabel, MenuItem, FormControl
} from '@material-ui/core';

import { InitialState as CreatePostState} from '../reducers/createPostReducer';
import { InitialState as JobDetails } from '../../redux/reducers/jobDetails';
import {Category, JobPoster, Location} from '../../types';

const createPostStyles = (theme: Theme) => createStyles({
    topDivider: {
        height: theme.spacing(0.4)
    },
    formControl: {
        minWidth: 120,
    },
    description: {
        resize: 'both',
        minHeight: theme.spacing(20),
        maxHeight: theme.spacing(30)
    },
});

interface CreatePostProps extends WithStyles<typeof createPostStyles> {
    additionalPostDetails: JobDetails;
    onChange: (property: keyof CreatePostState, value: any) => unknown;
    onResetClick: () => unknown;
    onPostClick: () => unknown;
    data: CreatePostState;
}

const CreatePost: FunctionComponent<CreatePostProps> = ({ classes, onChange, onResetClick, onPostClick, data, additionalPostDetails }) => {
    const dropdownValuesForLocations = useMemo(() => {
        return additionalPostDetails.locations.data.map((location: Location) => {

            return (<MenuItem key={location.id} value={location.id}>{`${location.name} ${location.street_address_1} ${location.street_address_2}, ${location.city} ${location.state} ${location.zip_code}`}</MenuItem>);
        });
    }, [ additionalPostDetails.locations ]);

    const dropdownValuesForCategories = useMemo(() => {
        return additionalPostDetails.categories.data.map((category: Category) => {

            return (<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>);
        });
    }, [ additionalPostDetails.categories ]);

    const dropdownValuesForPosters = useMemo(() => {
        return additionalPostDetails.posters.data.map((poster: JobPoster) => {

            return (<MenuItem key={poster.id} value={poster.id}>{poster.full_name}</MenuItem>);
        });
    }, [ additionalPostDetails.posters ]);
    
    return (
        <>
            <Grid
                container
                direction='column'
                spacing={3}
            >
                <Grid
                    item
                    xs={6}
                >
                    <TextField
                        fullWidth
                        label='Job Title'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={data.title}
                        variant='outlined'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('title', e.target.value)}
                    />
                </Grid>
                <Grid
                    container
                    item
                    spacing={3}
                >
                    <Grid
                        item
                        xs={3}
                    >
                        <FormControl
                            fullWidth
                            className={classes.formControl}
                            variant='outlined'
                        >
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={data.category_id ?? ''}
                                label='Category'
                                onChange={(e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => onChange('category_id', e.target.value)}
                            >
                                { dropdownValuesForCategories }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                    >
                        <FormControl
                            fullWidth
                            className={classes.formControl}
                            variant='outlined'
                        >
                            <InputLabel>Job Poster</InputLabel>
                            <Select
                                value={data.job_poster_id ?? ''}
                                label='Job Poster'
                                onChange={(e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => onChange('job_poster_id', e.target.value)}
                            >
                                { dropdownValuesForPosters }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    <FormControl
                        error={!!additionalPostDetails.locations.error}
                        fullWidth
                        className={classes.formControl}
                        variant='outlined'
                    >
                        <InputLabel>Location</InputLabel>
                        <Select
                            value={data.location_id ?? ''}
                            label='Location'
                            onChange={(e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => onChange('location_id', e.target.value)}
                        >
                            { dropdownValuesForLocations }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <TextField
                        fullWidth
                        label='Description'
                        multiline
                        inputProps={{ className: classes.description }}
                        value={data.description}
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('description', e.target.value)}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Grid
                        container
                        item
                        spacing={2}
                        justifyContent='flex-end'
                    >
                        <Grid item>
                            <Button
                                onClick={onResetClick}
                                variant='outlined'
                            >
                                Clear All
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={onPostClick}
                                color='primary'
                                variant='contained'
                            >
                                Post
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default withStyles(createPostStyles)(CreatePost);