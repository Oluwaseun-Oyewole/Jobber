import { useGetJobSearchQuery } from "@/app/store/query";
import { setNotification, startSearch, stopSearch } from "@/app/store/slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryByNameValidationSchema } from "@/lib/schema/country";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { Form, Formik } from "formik";
import { MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type IState = {
  name: string;
  status_code: string;
};

type ISearch = {
  searchTerm: string;
};
type ISearchType = {
  resultsPerPage: number;
  page: number;
  searchQuery?: string;
  location: string;
  searchLocation?: string;
};

const Search = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { states, country } = useAppSelector((state) => state.rootReducer.jobs);
  const [searchController, setSearchController] = useState(false);
  const page = +searchParams.get("page")!;
  const resultsPerPage = +searchParams.get("resultsPerPage")!;

  const updateURLFromSearchQuery = useDebouncedCallback(
    (query: {
      search: string;
      searchLocation: string;
      page: number;
      resultsPerPage: number;
    }) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", query.page.toString());
      params.set("resultsPerPage", query.resultsPerPage.toString());
      if (query.searchLocation && query.search) {
        params.set("query", query.search);
        params.set("location", query.searchLocation);
      } else if (query.search) {
        params.set("query", query.search);
      } else if (query.searchLocation) {
        params.set("location", query.searchLocation);
      } else {
        params.delete("query");
        params.delete("location");
      }
      router.push(`?${params.toString()}`);
    },
    50,
  );
  const checkIfJobInArray = (object: ISearch, array: ISearch[]): boolean => {
    return array.some((item) => item === object);
  };

  const saveSearches = (object: ISearch) => {
    let currentList: ISearch[] = [];
    const storedList = localStorage.getItem("savedJobs");
    if (storedList) {
      currentList = JSON.parse(storedList);
    }
    const obj = checkIfJobInArray(object, currentList);
    if (obj) {
      return;
    } else {
      currentList.push(object);
      if (typeof window !== "undefined") {
        localStorage.setItem("searches", JSON.stringify(currentList));
        localStorage.setItem("notification", String(true));
      }
      dispatch(setNotification());
    }
  };

  const [myState, setState] = useState<ISearchType>({
    resultsPerPage: 0,
    page: 0,
    searchQuery: "",
    location: "",
    searchLocation: "",
  });
  useGetJobSearchQuery(myState, {
    skip:
      !myState.page ||
      !myState.resultsPerPage ||
      (!myState.searchQuery && !myState.location) ||
      (!myState.searchLocation && !myState.location),
  });

  const onSubmit = async (values: Record<string, any>, { resetForm }: any) => {
    setSearchController(true);
    if (values.location && values.search === "") {
      setState({
        page: page > 0 ? page : 1,
        resultsPerPage: resultsPerPage > 0 ? resultsPerPage : 4,
        location: country,
        searchLocation: values.location,
      });
    } else if (values.search && values.location === "") {
      setState({
        page: page > 0 ? page : 1,
        resultsPerPage: resultsPerPage > 0 ? resultsPerPage : 4,
        location: country,
        searchQuery: values.search,
      });
    } else {
      setState({
        page: page > 0 ? page : 1,
        resultsPerPage: resultsPerPage > 0 ? resultsPerPage : 4,
        location: country,
        searchQuery: values.search,
        searchLocation: values.location,
      });
    }
    updateURLFromSearchQuery({
      search: values?.search ?? "",
      searchLocation: values.location,
      page: page <= 0 ? 1 : page,
      resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
    });
    dispatch(setNotification());
    saveSearches(values.search || values.location);
    resetForm({});
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.delete("location");
    router.push(`?${params.toString()}`);
  }, []);

  console.log("controller", searchController);

  useEffect(() => {
    if (!searchController) {
      dispatch(stopSearch());
    } else {
      dispatch(startSearch());
    }
  }, [searchController]);

  return (
    <div>
      <Formik
        initialValues={{
          search: "",
          location: "",
        }}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="grid gap-3 lg:gap-0 lg:grid-flow-col lg:grid-cols-[85%_15%] items-center bg-lightGray">
              <div className="grid gap-3 lg:gap-0 md:grid-cols-[60%_40%] items-center lg:bg-white">
                <Input
                  name="search"
                  type="search"
                  value={formik.values.search}
                  className="autocomplete-input h-[52px] w-full px-10 rounded-lg border-none font-[400] placeholder:!text-sm placeholder:!text-gray-500"
                  onChange={formik.handleChange}
                  autoComplete="off"
                  placeholder="job title, company"
                />
                <div className="relative">
                  <Select
                    name="location"
                    value={formik.values.location}
                    onValueChange={(value: string) => {
                      formik.setFieldValue("location", value);
                    }}
                  >
                    <SelectTrigger className="w-full  pl-9 font-medium">
                      <SelectValue placeholder="select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Remote" className="font-light">
                        Remote
                      </SelectItem>

                      {states?.map((state: IState, index) => {
                        const validatedSchema =
                          countryByNameValidationSchema.safeParse(state);
                        const removeState = state.name
                          .split(" ")
                          .filter((item) => item !== "State")
                          .join(" ");
                        if (!validatedSchema.success) return;
                        return (
                          <SelectItem
                            key={index}
                            value={`${removeState}`}
                            className="font-light"
                          >
                            {state?.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <div className="flex gap-3 absolute top-[11px] -left-3 px-6 ">
                    <MapPin size={17} fontWeight={200} />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                children="Search"
                disabled={!formik.values.location && !formik.values.search}
                className="bg-lightBlue h-[52px] lg:ml-5 hover:bg-lightBlue rounded-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Search;
