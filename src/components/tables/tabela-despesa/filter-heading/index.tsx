import React from "react";
import SearchInput from "./search-input";
import LayoutSwitch from "./layout-switch";
import SortBy from "./sort-by";
import Filters from "./filters";

const FilterHeading = () => {
  return (
    <div className="flex gap-4 items-center p-4">
      <div className="flex items-center w-full">
        <SearchInput />
      </div>
      <div className="flex items-center justify-end w-full space-x-5">
        <LayoutSwitch />
        <SortBy />
        <Filters />
      </div>
    </div>
  );
};

export default FilterHeading;
