export type State = {
    spec: object
};

const initialState: State = {
    spec: require('../../spec/petstore.oas2.json')
};

const reducer: any = (state = initialState, action: any) => {

    if (action.type === 'TEXT_CHANGE') {
        return {
            ...state,
            spec: JSON.parse(action.value)
        }
    }

    return state;
};

export default reducer;

