import React from "react";
import { columnsDespesas } from "./table-body/columns";
import TableBodyDespesas from "./table-body";
import { despesasTestData } from "@/test/test-data";

const TabelaDespesa = () => {
  return (
    <div className="flex flex-col bg-white w-full h-full shadow rounded dark:bg-black">
      <TableBodyDespesas columns={columnsDespesas} data={despesasTestData} />
    </div>
  );
};

export default TabelaDespesa;
