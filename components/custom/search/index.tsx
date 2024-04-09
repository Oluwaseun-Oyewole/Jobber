import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

const Search = () => {
  return (
    <div className="grid gap-3 md:gap-0 lg:grid-flow-col lg:grid-cols-[85%_15%] items-center bg-lightGray">
      <div className="grid gap-3 lg:gap-0 md:grid-cols-[65%_35%] items-center lg:bg-white">
        <Input
          type="search"
          className="h-[55px] w-full px-8 rounded-lg border-none font-[400]"
        />

        <div className="relative">
          <Select>
            <SelectTrigger className="w-full py-7 pl-9">
              <SelectValue placeholder="select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Lagos</SelectItem>
              <SelectItem value="dark">Kano</SelectItem>
              <SelectItem value="system">Oyo</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 absolute top-5 -left-3 px-6 ">
            <MapPin size={20} />
          </div>
        </div>
      </div>

      <Button
        children="Search"
        className="bg-lightBlue h-[55px] lg:ml-5 hover:bg-lightBlue"
      />
    </div>
  );
};

export default Search;
