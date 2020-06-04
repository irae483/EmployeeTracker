import * as api from './APIUtils';
import { Employee } from '../models/Employee';
import {all} from '../server/DB/employees';

export const getEmployeeJson = async (): Promise<any> => {
  return api.getData(api.url + `Employee`);
}

export const getEmployees = async (): Promise<Employee[]> => {
  //const json = await getEmployeeJson();
  const json = all;
  return api.convertToModel<Employee>(json, Employee.Parse);
}

export const postEmployee = async (Employee: Employee) => {
  try {
    const response = await api.postData(api.url + `Employee`, JSON.stringify(Employee));
    return response.ok;
  } catch (error) {
    return false;
  }
}

export const putEmployee = async (EmployeeID: number, Employee: Employee) => {
  try {
    const response = await api.putData(api.url + `Employee/${EmployeeID}`, JSON.stringify(Employee));
    return response.ok;
  } catch (error) {
    return false;
  }
}