import { diagnose } from '../util/linting';
import { IRuleResult } from '@stoplight/spectral';

export type State = {
    spec: any,
    diagnostics: IRuleResult[]
};

const initialState: State = {
    spec: require('../../spec/petstore.oas2.json'),
    diagnostics: diagnose(this.spec)
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

