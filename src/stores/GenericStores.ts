import { observable, action } from "mobx";
import { TableIndices, defaultTableIndices, } from "../models/StateInterfaces";
import { PromisedComputedValue, promisedComputed } from "computed-async-mobx";


// GENERIC STORES
export type ListStore<T> = PromisedComputedValue<T[]>;
export class TableStore<T> {
  public static val = <T>(getData: () => Promise<T[]>) => promisedComputed([], getData);

  public constructor(data: ListStore<T>, getDataCount?: () => Promise<number>) {
    this.data = data;
    this.dataCount = promisedComputed(0, getDataCount ? 
      getDataCount 
      : 
      () => this.data.get().length
    );
  }

  @observable public page: number = 0;
  @observable public indices: TableIndices = defaultTableIndices;
  @observable public selectedData: T[] = []; 
  public readonly data: ListStore<T>;
  public readonly dataCount: PromisedComputedValue<number>;

  public readonly clearSelection = action(() => {
    this.selectedData = [];
  });

  public readonly refresh = () => {
    this.data.refresh();
    this.dataCount.refresh();
  }
}

export abstract class SelectedStore<T> {
  public constructor(getItem: () => Promise<T|null>) {
    this.selectedItem = promisedComputed(null, getItem);
    this.editedItem = promisedComputed(null, getItem);
  }

  @observable public selectedID: number|null = null;
  public readonly selectedItem: PromisedComputedValue<T|null>;
  public readonly editedItem: PromisedComputedValue<T|null>;
}