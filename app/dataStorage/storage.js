import React from 'react';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

let storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true
});

let s = {
    save(key,data){
        storage.save({
            key: key,
            data: data
        });
    },
    get(key){
        return new Promise((resolve,reject)=>{
            storage.load({
                key: key,
                autoSync: true,
                syncInBackground: true
            }).then(ret => {
                resolve(ret);
            }).catch(err => {
                reject();
            })
        });
    },
    remove(key){
        storage.remove({
            key: key,
        });
    },
    clear(){
        storage.clearMap();
    },
    clearDataByKey(key){
        storage.clearMapForKey(key);
    }
};
export default s;