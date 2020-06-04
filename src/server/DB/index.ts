import * as mysql from 'mysql';
import config from '../config';

import Employees from './employees';

export const Connection = mysql.createConnection(config.mysqlpath);


Connection.connect(function(error : Error) {
    if(error) console.log(error);
});

export default {
    Employees
}