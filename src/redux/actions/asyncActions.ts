import { additionalJobDetails } from '../reducers/jobDetails';
import { InitialState as JobDetails } from "../reducers/jobDetails";

//My design intention behind using redux-thunk:
//Whenever we are dealing with asynchronous data, it is better we abstract that logic outside of our component. This
//greatly benefits us in terms of centralizing the logic in one single place, this is especially true if the same
//async call is made elsewhere in the page. Moreover, with abstracting away the async logic helps us easily test
//our component without any sort of mocking. In our scenario, we are store our job details information like
//locations, job posters and categories in Redux store such that when the new job posting page is loaded, we are
//simply returning previous data instead of refetching the data. So we leveraged Redux store as cache mechanism.
//my blog on async management in Redux ecosystem: https://ahamedblogs.wordpress.com/2020/09/06/__trashed/


/**
 * Known as the "async action creator" that will be called inside our component. Instead of returning regular action objects, it returns a function.
 *
 * @function fetchAdditionalJobDetails
 * @return {function} thunk
 */

export const fetchAdditionalJobDetails = (property: keyof JobDetails, taskFunc: CallableFunction): CallableFunction => {
    /**
     * Delay dispatch of actions until the async operation to fetch job details is complete
     *
     * @async
     * @function thunk
     * @param {function} dispatch - Redux store function used to dispatch an action
     * @param {function} getState - Redux store function used to retrieve the current state tree of the application
     * @return {undefined}
     */

    const thunk = async (dispatch: any, getState: any) => {
        if (!getState().jobDetails[property].data.length) {
            dispatch(additionalJobDetails({ property, loading: true, data: [], error: '' }));

            try {
                const { data } = await taskFunc();
                dispatch(additionalJobDetails({ property, loading: false, data, error: '' }));
            } catch (e) {
                dispatch({ property, loading: false, data: [], error: 'Fetch failed' });
            }
        }
    };

    return thunk;
};