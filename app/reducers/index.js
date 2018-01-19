import com from '../constants';
import storage from '../dataStorage/storage';

let { types } = com;

let str = JSON.stringify({
    usrData: {},
    allData: {
        typeStartIndex:1,
        type:[],
        data:{}
    }
});

let initialState = JSON.parse(str);

storage.get('state').then(d=>(initialState=d)).catch(()=>{});

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SAVE_ALL_DATA:
            let data1 = Object.assign({}, state, {
                allData: action.allData
            });
            storage.save('state',data1);
            return data1;
        case types.SAVE_USR_DATA:
            let data2 = Object.assign({}, state, {
                usrData: action.usrData
            });
            storage.save('state',data2);
            return data2;
        case types.CLEAR_DATA:
            storage.save('state',JSON.parse(str));
            return JSON.parse(str);
        default:
            return state;
  }
}