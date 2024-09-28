import { Input } from "@/components/ui/input";
import React from "react";

const SearchInput = () => {
  return (
    <div className="flex items-center w-full">
      <Input
        placeholder="Pesquisar"
        className="bg-gray-50 dark:bg-zinc-400 text-black placeholder:text-black"
      />
    </div>
  );
};

export default SearchInput;
