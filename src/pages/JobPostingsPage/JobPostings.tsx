import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { History } from 'history';

// Material-ui supports tree shaking as it uses ES6 to construct its modules
// so we can able to write more simplified import statements like the following. To confirm,
// we can use the webpack-bundle-analyzer plugin to inspect the bundle size.
// I once get to explore tree-shaking, please check it out: https://ahamedblogs.wordpress.com/2020/02/11/reducing-js-bund
import { Link, withStyles, WithStyles, createStyles } from '@material-ui/core';

import { JobPosting } from '../../types'
import './JobPostings.scss';

const jobPostingsStyles = () => createStyles({
    title: {
        cursor: 'pointer'
    }
});

interface JobPostingsProps extends WithStyles<typeof jobPostingsStyles> {
    jobPostings: JobPosting[];
}

const postedDate = (postedAt: string) => postedAt.split('T')[0];

const JobPostings: FunctionComponent<JobPostingsProps> = ({ classes, jobPostings }) => {
    const history: History = useHistory();

    const handleTitleClick = (id: number): void => {
        history.push(`/job_postings/${id}`);
    };

    return (
        <table className='JobPostings-table'>
            <thead>
            <tr>
                <th className='JobPostings-tableHeader'>Date</th>
                <th className='JobPostings-tableHeader'>Title</th>
                <th className='JobPostings-tableHeader'>Poster</th>
                <th className='JobPostings-tableHeader'>Category</th>
                <th className='JobPostings-tableHeader'>Location</th>
                <th className='JobPostings-tableHeader'>Status</th>
                <th className='JobPostings-tableHeader'>Actions</th>
            </tr>
            </thead>

            <tbody>
            {
                jobPostings.map((posting: JobPosting) => (
                    <tr key={posting.id}>
                        <td className='JobPostings-tableData'>{postedDate(posting.posted_at)}</td>
                        <td
                            className='JobPostings-tableData'
                            onClick={() => handleTitleClick(posting.id)}
                        >
                            <Link className={classes.title}>{posting.title}</Link>
                        </td>
                        <td className='JobPostings-tableData'>{posting.job_poster.full_name}</td>
                        <td className='JobPostings-tableData'>{posting.category.name}</td>
                        <td className='JobPostings-tableData'>{posting.location.name}</td>
                        <td className='JobPostings-tableData'>{posting.status}</td>
                        <td className='JobPostings-tableData'></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
};

export default withStyles(jobPostingsStyles)(JobPostings);