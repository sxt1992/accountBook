import com from '../constants';

let { types } = com;

const actions = {
    saveAllData: (action={}) => Object.assign(action,{type:types.SAVE_ALL_DATA}),
    saveUsrData: (action={}) => Object.assign(action,{type:types.SAVE_USR_DATA}),
    clearData: (action={}) => Object.assign(action,{type:types.CLEAR_DATA})
};

export default actions;