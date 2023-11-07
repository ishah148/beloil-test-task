import { useState, useEffect } from "react";
import {
  DataTable,
  DataTablePageEvent,
  DataTableSortEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { CustomerService } from "../../service/CustomerService.ts";
import { InputText } from "primereact/inputtext";
import { Customer, LazyTableState } from "./DataTable.types.ts";
import ActionBar from "../actionBar/ActionBar.tsx";

export default function LazyLoadDemo() {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [lazyState, setLazyState] = useState<LazyTableState>({
    first: 0,
    rows: 10,
    page: 1,
    sortField: undefined,
    sortOrder: undefined,
    filters: {
      name: { value: "", matchMode: "contains" },
      "country.name": { value: "", matchMode: "contains" },
      company: { value: "", matchMode: "contains" },
      "representative.name": { value: "", matchMode: "contains" },
    },
  });

  let networkTimeout: number | null | NodeJS.Timeout = null;

  useEffect(() => {
    loadLazyData();
  }, [lazyState]);

  const loadLazyData = () => {
    setLoading(true);

    if (networkTimeout) {
      clearTimeout(networkTimeout);
    }

    //imitate delay of a backend call
    networkTimeout = setTimeout(
      () => {
        CustomerService.getCustomers({
          lazyEvent: JSON.stringify(lazyState),
        }).then((data) => {
          setTotalRecords(data.totalRecords);
          setCustomers(data.customers);
          setLoading(false);
        });
      },
      Math.random() * 1000 + 250,
    );
  };

  const onPage = (event: DataTablePageEvent) => {
    console.log("onPage", event);
    setLazyState(event);
  };

  const onSort = (event: DataTableSortEvent) => {
    console.log("onSort", event);
    setLazyState(event as unknown as LazyTableState);
  };

  const textEditor = (options) => {
    console.log("textEditor Options", options);
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback(e.target.value)
        }
      />
    );
  };



  const countryBodyTemplate = (rowData: Customer) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt="flag"
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`flag flag-${rowData.country.code}`}
          style={{ width: "24px" }}
        />
        <span>{rowData.country.name}</span>
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={customers}
        lazy
        // filterDisplay="row"
        // onFilter={onFilter}
        resizableColumns
        editMode="cell"
        dataKey="id"
        paginator
        first={lazyState.first}
        rows={10}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        // filters={lazyState.filters}
        loading={loading}
        tableStyle={{ minWidth: "75rem" }}

        // selection={selectedCustomers}
        // onSelectionChange={onSelectionChange}
        // selectAll={selectAll}
        // onSelectAllChange={onSelectAllChange}
      >
        <Column headerStyle={{ width: "3rem" }} />
        <Column
          field="name"
          header="Name"
          sortable
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        />
        <Column
          field="country.name"
          sortable
          header="Country"
          filterField="country.name"
          body={countryBodyTemplate}
        />
        <Column
          field="company"
          sortable
          header="Company"
        />
        <Column
          field="ooo"
          header="Действия"
          body={() => <ActionBar />}
        />
      </DataTable>
    </div>
  );
}
