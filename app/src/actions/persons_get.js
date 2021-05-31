export function personsFetchDataSuccess(persons) {
    return {
        type: "PERSONS_FETCH_DATA_SUCCESS",
        persons: persons 
    }
}

/* 
* Изначально вызывается personsFetchData, который делает асинхронный запрос
* и только после этого вызовает Action - personsFetchDataSuccess
*/
export function personsFetchData(url) {
    /*
    * dispatch - нужен чтобы вызвать потом personsFetchDataSuccess
    */
    return (dispatch) => {
        /*
        * fetch - выполняет GET\POST\DELETE\PUT - запрос
        * (url) - тот адрес по которому будет выполнен запрос
        */
       fetch(url)
            /*
            * возвращается промис -  response, который 
            * можно проверить с помощью .then
            * .statusText - причина ошибки
            */
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            /*
            * после проверки данных нужно распарсить в json {} (серилизация данных)
            */
            .then(response => response.json())
            /*
            * и когда данные уже получены в .json - кладем 
            * в persons и передаем в personsFetchDataSuccess
            */
            .then(persons => dispatch(personsFetchDataSuccess(persons)))
    }
}