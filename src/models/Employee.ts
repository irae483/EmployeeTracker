import {checkString, throwIsArray, throwNotObject, throwNull2NonNull} from '../util/ModelUtils'


export class Employee {
    public id : number;
    public name : string;
    public address : string;
    public emailAddress : string;
    public phoneNumber : string;
    public position : string;
    public department : string;
    public startDate : string;
    public endDate : string;
    public status : string;
    public shift : string;
    public manager : string;
    public photo : string;
    public favoriteColor : string;

    public static Parse(d: any): Employee {
        return Employee.Create(d);
    }
    public static Create(d: any, field: string = 'root'): Employee {
        if (!field) {
            field = 'root';
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
          } else if (typeof (d) !== 'object') {
            throwNotObject(field, d, false);
          } else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
          }
          checkString(d.name, false, field + '.name');
          return new Employee(d);
    }

    public constructor(d?: any) {
        this.id = (d && d.id) || -1;
        this.name = (d && d.name) || '';
        this.address = (d && d.address) || '';
        this.emailAddress = (d && d.emailAddress) || '';
        this.phoneNumber = (d && d.phoneNumber) || '';
        this.position = (d && d.position) || '';
        this.department = (d && d.department) || '';
        this.startDate = (d && d.startDate) || '';
        this.endDate = (d && d.endDate) || '';
        this.status = (d && d.status) || '';
        this.shift = (d && d.shift) || '';
        this.manager = (d && d.manager) || '';
        this.photo = (d && d.phot) || '';
        this.favoriteColor = (d && d.favoriteColor) || '';
    }
}
