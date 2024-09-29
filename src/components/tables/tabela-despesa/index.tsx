import React from "react";
import FilterHeading from "./filter-heading";
import { columns } from "./table-body/columns";
import { TablePagination } from "./table-body/table-pagination";
import TableBodyDespesas from "./table-body";

const TabelaDespesa = () => {
  return (
    <div className="flex flex-col bg-white w-full h-full shadow rounded dark:bg-black">
      {/* <FilterHeading /> */}
      <TableBodyDespesas/>
    </div>
  );
};

export default TabelaDespesa;
