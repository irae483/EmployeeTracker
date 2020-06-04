import { configure } from 'mobx';
import { MainPageStore } from "./MainPageStore";
import { promisedComputed } from "computed-async-mobx";
import { Employee } from "../models/Employee";
import { ListStore } from "./GenericStores";
import { SnackbarStore } from './SnackbarStore';
import * as api from "../api/api";

configure({enforceActions: 'always'})

export class RootStore {
  public readonly employees: ListStore<Employee>;
  public readonly snackbarStore: SnackbarStore;

  public readonly mainPageStore: MainPageStore;

  public constructor() {
    this.employees =  promisedComputed([], api.getEmployees);

    this.snackbarStore = new SnackbarStore();

    this.mainPageStore = new MainPageStore(
      this.employees,
      this.snackbarStore
    );
    
  }

}