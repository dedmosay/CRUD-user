import axios from "axios";

export function personsFetchDataSuccess(persons) {
    return {
        type: "PERSONS_FETCH_DATA_SUCCESS",
        persons: persons
    }
}

export function personsFetchData(url) {
    return (dispatch) => {
        axios.get(url)
            .then(({ data }) => dispatch(personsFetchDataSuccess(data)))
    }
}