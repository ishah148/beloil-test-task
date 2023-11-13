import { ColumnFilterElementTemplateOptions } from "primereact/column";

export const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  const value = options.value || "";
  return (
    <input
      type="date"
      className="p-inputtext p-component"
      value={value}
      onChange={(e) => {
        options.filterApplyCallback(e.target.value);
      }}
    />
  );
};
