
import {Employee} from '../models/Employee'
import { ListStore, TableStore} from './GenericStores';
import {SnackbarStore} from './SnackbarStore';

export class MainPageStore {

  public constructor(
    employees: ListStore<Employee>,
    snackbarStore: SnackbarStore) {
      this.employeeTableStore = new TableStore<Employee>(employees);
      this.snackbarStore = snackbarStore;
  }
  
  public readonly employeeTableStore: TableStore<Employee>;
  public readonly snackbarStore: SnackbarStore;
}