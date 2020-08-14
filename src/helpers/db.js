import { openDatabase } from 'expo-sqlite';

const db = openDatabase('places.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NIT NULL, address TEXT NOT NULL, lat REAL, lng REAl);', 
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                });
        });
    });

    return promise;
}

export const addPlaces = (title, image, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO places (title, image, address, lat, lng) VALUES (? , ?, ?, ?, ?)', 
                [title, image, address, lat, lng],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                });
        });
    });

    return promise;
}

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM places', 
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                });
        });
    });

    return promise;
}