import React from "react";
import { TablePagination, Theme, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import ReactDataGrid, { Column, SelectionParams } from "react-data-grid";
import { action } from "mobx";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { PendingWrapper } from "./PendingWrapper";
import { TableStore } from "../stores/GenericStores";
import { observer } from "mobx-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contain: {
      width: "100%",
      minWidth: "50em",
    },
    icon: {
      height: "30px",
      width: "30px",
      marginTop: "8px",
    },
    bottomRow: {
      display: "flex",
      flexDirection: "row",
    },
    pagination: {
      marginLeft: "auto",
    },
    button: {
      marginTop: "7px",
      marginBottom: "10px",
    },
  })
);

export type OnTableRowClick<T> = (index: number, data?: T) => void;
export type OnTableCellClick<T> = (data: T) => void;
export type OnTableRowsSelect<T> = (rows: SelectionParams<T>[]) => void;
export interface SpecialColumnOptions<T> {
  onColumnCellClick: OnTableCellClick<T>;
  location?: "left" | "right";
}
export interface SelectOptions<T> {
  areSame: (row1: T, row2: T) => boolean;
}

export interface DataGridInteractiveTableProps<T> {
  store: TableStore<T>;
  headers: Column<T>[];
  rowsPerPage?: number;
  onRowClick?: OnTableRowClick<T>;
  removeOptions?: SpecialColumnOptions<T>;
  editOptions?: SpecialColumnOptions<T>;
  selectOptions?: SelectOptions<T>;
}

export const InteractiveTable = observer(
  <T extends any>(props: DataGridInteractiveTableProps<T>) => {
    // INITIALIZATION
    const rowsPerPage =
      props.rowsPerPage === undefined ? 15 : props.rowsPerPage;

    const classes = useStyles();
    const specialKeys = {
      delete: "DELETE",
      edit: "EDIT",
    };
    const columnProperties: Partial<Column<T>> = {
      resizable: true,
    };

    // CALLBACKS
    const getDataGetter = (data: T[]) => {
      return (index: number) => data[index];
    };

    const onChangePage = action((event: any, page: number) => {
      const pageStartIndex = page * rowsPerPage;
      props.store.indices = {
        start: pageStartIndex + 1,
        end: pageStartIndex + rowsPerPage,
      };
      props.store.page = page;
    });

    // COLUMN SETUP
    const columns: Column<T>[] = props.headers.map((header) => ({
      ...header,
      ...columnProperties,
    }));

    if (props.editOptions) {
      // Render a column of edit buttons
      const editColumnHeader: Column<T> = {
        key: specialKeys.edit,
        name: "",
        width: 50,
        formatter: (value: any) => {
          const row = value.row as T;
          return (
            <EditIcon
              className={classes.icon}
              onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                e.stopPropagation();
                props.editOptions?.onColumnCellClick(row);
              }}
            />
          );
        },
      };
      const isRight = props.editOptions.location !== "left";
      isRight
        ? columns.push(editColumnHeader)
        : columns.unshift(editColumnHeader);
    }

    if (props.removeOptions) {
      // Render a column of delete buttons
      const removeColumnHeader: Column<T> = {
        key: specialKeys.delete,
        name: "",
        width: 45,
        formatter: (value: any) => {
          const row = value.row as T;
          return (
            <ClearIcon
              className={classes.icon}
              onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                e.stopPropagation();
                props.removeOptions?.onColumnCellClick(row);
              }}
            />
          );
        },
      };
      const isRight = props.removeOptions.location !== "left";
      isRight
        ? columns.push(removeColumnHeader)
        : columns.unshift(removeColumnHeader);
    }

    // SELECTION
    const getSelectedIndices = (): number[] => {
      if (props.selectOptions) {
        return props.store.data
          .get()
          .map((row, index) =>
            props.store.selectedData.find((selected) =>
              props.selectOptions?.areSame(selected, row)
            )
              ? index
              : -1
          )
          .filter((index) => index >= 0);
      } else return [];
    };

    const getSelectHandler = (deselect?: boolean): OnTableRowsSelect<T> => {
      if (props.selectOptions)
        return (rows: SelectionParams<T>[]) => {
          const changingRows = rows.map((row) => row.row);
          const newSelected = deselect
            ? props.store.selectedData.filter(
                (selected) =>
                  !changingRows.find((row) =>
                    props.selectOptions?.areSame(row, selected)
                  )
              )
            : [...props.store.selectedData, ...changingRows];
          setSelection(newSelected);
        };
      else return () => undefined;
    };

    const setSelection = action((data: T[]) => {
      props.store.selectedData = data;
    });

    return (
      <div className={classes.contain}>
        <div>
          <PendingWrapper show={props.store.data.busy}>
            <ReactDataGrid
              minHeight={562}
              minWidth={0}
              minColumnWidth={100}
              columns={columns}
              rowGetter={getDataGetter(props.store.data.get())}
              rowsCount={rowsPerPage}
              onRowClick={props.onRowClick}
              rowSelection={
                props.selectOptions
                  ? {
                      showCheckbox: true,
                      enableShiftSelect: true,
                      onRowsSelected: getSelectHandler(),
                      onRowsDeselected: getSelectHandler(true),
                      selectBy: { indexes: getSelectedIndices() },
                    }
                  : undefined
              }
            />
          </PendingWrapper>
        </div>
        <div className={classes.bottomRow}>
          {props.selectOptions && (
            <Button
              className={classes.button}
              variant="contained"
              onClick={props.store.clearSelection}
              size="medium"
              color="primary"
              disabled={props.store.selectedData.length === 0}
            >
              Clear Selection
            </Button>
          )}
          <TablePagination
            component="div"
            className={classes.pagination}
            count={props.store.dataCount.get()}
            onChangePage={onChangePage}
            page={props.store.page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]}
          />
        </div>
      </div>
    );
  }
);
