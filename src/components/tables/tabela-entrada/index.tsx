import React from "react";
import { columnsReceitas } from "./table-body/columns";
import { receitasTestData } from "@/test/test-data";
import TableBodyReceita from "./table-body";

const TabelaReceita = () => {
  return (
    <div className="flex flex-col bg-white w-full h-full shadow rounded dark:bg-black">
      <TableBodyReceita columns={columnsReceitas} data={receitasTestData} />
    </div>
  );
};

export default TabelaReceita;
