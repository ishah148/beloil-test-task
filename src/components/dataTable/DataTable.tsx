import { useState, useEffect } from "react";
import {
  DataTable,
  DataTableSelectionChangeEvent,
  DataTableSelectAllChangeEvent,
  DataTablePageEvent,
  DataTableSortEvent,
  DataTableFilterEvent,
  DataTableFilterMeta,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { CustomerService } from "../../service/CustomerService.ts";
import { InputText } from 'primereact/inputtext';
import {Customer, LazyTableState} from "./DataTable.types.ts";



export default function LazyLoadDemo() {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[] | null>(
    null,
  );
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

  const onFilter = (event: DataTableFilterEvent) => {
    console.log("onFilter", event);
    event["first"] = 0;
    setLazyState(event as unknown as LazyTableState);
  };

  const onSelectionChange = (event: DataTableSelectionChangeEvent) => {
    const value = event.value;

    setSelectedCustomers(value);
    setSelectAll(value.length === totalRecords);
  };

  const textEditor = (options) => {
    console.log("textEditor Options",options)
    return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} />;
  };

  const onSelectAllChange = (event: DataTableSelectAllChangeEvent) => {
    const selectAll = event.checked;

    if (selectAll) {
      CustomerService.getCustomers().then((data) => {
        setSelectAll(true);
        setSelectedCustomers(data.customers);
      });
    } else {
      setSelectAll(false);
      setSelectedCustomers([]);
    }
  };

  const representativeBodyTemplate = (rowData: Customer) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={rowData.representative.name}
          src={`https://primefaces.org/cdn/primereact/images/avatar/${rowData.representative.image}`}
          width={32}
        />
        <span>{rowData.representative.name}</span>
      </div>
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
        filters={lazyState.filters}
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
          filter
          filterPlaceholder="Search"
          editor={(options) => textEditor(options)} style={{ width: '20%' }}
        />
        <Column
          field="country.name"
          sortable
          header="Country"
          filterField="country.name"
          body={countryBodyTemplate}
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="company"
          sortable
          filter
          header="Company"
          filterPlaceholder="Search"
        />
        <Column
          field="representative.name"
          header="Representative"
          body={representativeBodyTemplate}
          filter
          filterPlaceholder="Search"
        />
      </DataTable>
    </div>
  );
}
