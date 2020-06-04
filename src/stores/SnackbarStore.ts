import { observable, action } from "mobx";
import { Color } from "@material-ui/lab/Alert";

export class SnackbarStore {
  @observable show: boolean = false;
  @observable body: string = 'YAYAYAYAY';
  @observable severity: Color = 'success';

  public close = action(() => {
    this.show = false;
  });

  public open = action((body: string, color: Color) => {
    this.show = true;
    this.body = body;
    this.severity = color;
  });
}