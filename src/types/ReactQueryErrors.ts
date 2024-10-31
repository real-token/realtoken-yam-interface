export enum REACT_QUERY_ERRORS {
    FETCH_PRICES = 'FETCH_PRICES',
    FETCH_USER_BALANCES = 'FETCH_USER_BALANCES',
    FETCH_OFFERS = 'FETCH_OFFERS',
    FETCH_WL_PROPERTIES = 'FETCH_WL_PROPERTIES',
    FETCH_HISTORICS = 'FETCH_HISTORICS'
}

// TODO: Add translation for the error messages
export const REACT_QUERY_ERRORS_DATA: Record<REACT_QUERY_ERRORS, { message: string }> = {
    [REACT_QUERY_ERRORS.FETCH_PRICES]: { message: 'Error fetching prices' },
    [REACT_QUERY_ERRORS.FETCH_USER_BALANCES]: { message: 'Error fetching user balances' },
    [REACT_QUERY_ERRORS.FETCH_OFFERS]: { message: 'Error fetching offers' },
    [REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES]: { message: 'Error fetching WL properties' },
    [REACT_QUERY_ERRORS.FETCH_HISTORICS]: { message: 'Error fetching historics' }
}
