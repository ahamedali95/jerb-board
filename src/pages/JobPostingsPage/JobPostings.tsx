import React, { FunctionComponent } from 'react'

import {JobPosting} from '../../types'
import './JobPostings.scss';
import { useHistory } from "react-router";
import {History} from "history";
import {Link, withStyles, makeStyles, WithStyles} from "@material-ui/core";

const jobPostingsStyles = () => makeStyles({
    title: {
        cursor: 'pointer'
    }
});

interface JobPostingsProps extends WithStyles<typeof jobPostingsStyles> {
    jobPostings: JobPosting[];
    onJobClick: (val: string | null) => unknown;
}

const postedDate = (postedAt: string) => postedAt.split('T')[0];

const JobPostings: FunctionComponent<JobPostingsProps> = ({classes, jobPostings, onJobClick}) => {
    const history: History = useHistory();

    const handleTitleClick = (id: string | null): void => {
        onJobClick(id);
        history.push(`/jobPostings/${id}`);
    };

    return (
        <table className="JobPostings-table">
            <thead>
            <tr>
                <th className="JobPostings-tableHeader">Date</th>
                <th className="JobPostings-tableHeader">Title</th>
                <th className="JobPostings-tableHeader">Poster</th>
                <th className="JobPostings-tableHeader">Category</th>
                <th className="JobPostings-tableHeader">Location</th>
                <th className="JobPostings-tableHeader">Status</th>
                <th className="JobPostings-tableHeader">Actions</th>
            </tr>
            </thead>

            <tbody>
            {jobPostings.map((posting: JobPosting) => (
                <tr key={posting.id}>
                    <td className="JobPostings-tableData">{postedDate(posting.posted_at)}</td>
                    <td
                        className="JobPostings-tableData"
                        onClick={() => handleTitleClick(posting.id)}
                    >
                        <Link className={classes.title}>{posting.title}</Link>
                    </td>
                    <td className="JobPostings-tableData">{posting.job_poster.full_name}</td>
                    <td className="JobPostings-tableData">{posting.category.name}</td>
                    <td className="JobPostings-tableData">{posting.location.name}</td>
                    <td className="JobPostings-tableData">{posting.status}</td>
                    <td className="JobPostings-tableData"></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
};

export default withStyles(jobPostingsStyles)(JobPostings);