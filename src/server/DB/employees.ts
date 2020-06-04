import { Connection } from './index';

export const all = async () => {
    return new Promise((resolve, reject) => {
        Connection.query('Select * from Employee', (error : Error, results: Response) => {
            if(error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

export default {
    all
}