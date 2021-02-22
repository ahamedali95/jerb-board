# Jerb Board React

Candidate code challenge application built in React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

As a newly-minted software consultant for The Gnar Company Inc, you've been tasked with expanding upon a job posting application. This repo contains a skeleton codebase for the product. JerbyJerbs is a small company that advertises household job services and assigns the jobs to college students. It is currently a manual process:

1. Job posters call a phone number.
2. The receptionist takes down the information.
3. The receptionist enters it in the JerbyJerbs application.
4. JerbyJerbs staff manually match up posted jobs to job doers.

This is a multi-phased engagement. The goal of this phase is to build upon the existing code to support the job posting process.

## Instructions

The client has booked 2-4 hours of your time to complete the tasks outlined below.

You may add any tool, framework, or technology to complete the task. The existing code may be modified in any way necessary to achieve your goal. However, you must ensure that all current functionality remains intact. Please feel free to ask questions about the project with other Gnar Team Members.

Submit the results of your three completed tasks as a Pull Request for the team to review.

## Task 1: Use functional components

The application's current home page is a Job Postings Page, which lists all of the jobs available in the application. The `JobPostingsPage` component was built prior to functional components and hooks being introduced to React. Before starting new feature development, the JerbyJerbs team would like you to convert the `JobPostingsPage` to use functional components and hooks in place of the current class component and lifecycle methods.

## Task 2: View a job posting

JerbyJerbs would like the ability to click on an individual job posting from the list and view a page for that specific job.

Subtasks:

- Link the title of each job on the Job Postings Page to this new page to view the details of an individual Job Posting.
- Create the Job Posting Page. Render the title, description, category name, location data, and job poster full name on the Job Posting Page. The design of the page is not important.
- Include a link on the individual Job Posting Page that navigates to the list of all Job Postings Page.

Hint: The API path `GET /api/v1/job_postings/:id` will return an individual job posting.

## Task 3: Create a new job posting

While users are able to view job postings (and now an individual job posting), JerbyJerbs is still missing the ability to create a new job posting. For your final task, add a New Job Posting Page that renders a job posting form. The form should have inputs for the "title" and "description". It should also include select dropdowns for "category", "job_poster", and "location". For this task, you should be concerned with only the "happy path" of a user submitting valid data. See below for API documentation.

Subtasks:

- Render a new page with a job posting form at `/job_postings/new`.
- Add a link on the `JobPostingsPage` with the text "Create Job Posting" that navigates to the new job posting page.
- The job posting form data should be submitted to the server on form submit. At that point, the user should be navigated back to the job postings page.
- Render the newly-created job posting on the job postings page.

## API Documentation

### Get a Job Posting

**Request**

HTTP method and endpoint: `GET /api/v1/job_postings/:id`

**Response**

HTTP status: `200 (ok)`

Body:

```
{
    id: Integer
    title: String
    status: String
    description: String
    posted_at: String
    category: {
      id: Integer
      name: String
    }
    location: {
      id: Integer
      name: String
      street_address_1: String
      street_address_2: String | null
      city: String
      state: String
      zip_code: String
    }
    job_poster: {
      id: Integer
      full_name: String
    }
}
```

### Get Categories

**Request**

HTTP method and endpoint: `GET /api/v1/categories`

**Response**

HTTP status: `200 (ok)`

Body:

```
  {
    id: Integer
    name: String
  }[]
```

### Get Locations

**Request**

HTTP method and endpoint: `GET /api/v1/locations`

**Response**

HTTP status: `200 (ok)`

Body:

```
  {
    id: Integer
    name: String
    street_address_1: String
    street_address_2: String | null
    city: String
    state: String
    zip_code: String
  }[]
```

### Get Job Posters

**Request**

HTTP method and endpoint: `GET /api/v1/job_posters`

**Response**

HTTP status: `200 (ok)`

Body:

```
  {
    id: Integer
    full_name: String
  }[]
```

### Create a Job Posting

**Request**

HTTP method and endpoint: `POST /api/v1/job_postings`

Params:

```
{
  category_id: Integer
  description: String
  job_poster_id: Integer
  location_id: Integer
  title: String
}
```

**Response**

HTTP status: `201 (created)`

Body:

```
{
    id: Integer
    title: String
    status: String
    description: String
    posted_at: String
    category: {
      id: Integer
      name: String
    }
    location: {
      id: Integer
      name: String
      street_address_1: String
      street_address_2: String | null
      city: String
      state: String
      zip_code: String
    }
    job_poster: {
      id: Integer
      full_name: String
    }
}
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
