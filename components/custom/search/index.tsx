import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, Formik } from "formik";
import { MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateURLFromSearchQuery = useDebouncedCallback(
    (query: { search: string; location: string }) => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("query", query.search);
        params.set("location", query.location);
      } else {
        params.delete("query");
        params.delete("location");
      }
      router.push(`?${params.toString()}`);
    },
    50,
  );

  const onSubmit = async (values: Record<string, any>, { resetForm }: any) => {
    updateURLFromSearchQuery({
      search: values.search,
      location: values.location,
    });
    resetForm({});
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.delete("location");
    router.push(`?${params.toString()}`);
  }, []);

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
              <div className="grid gap-3 lg:gap-0 md:grid-cols-[65%_35%] items-center lg:bg-white">
                <Input
                  name="search"
                  type="search"
                  value={formik.values.search}
                  className="h-[55px] w-full px-8 rounded-lg border-none font-[400]"
                  onChange={formik.handleChange}
                />
                <div className="relative">
                  <Select
                    name="location"
                    value={formik.values.location}
                    onValueChange={(value: string) => {
                      formik.setFieldValue("location", value);
                    }}
                  >
                    <SelectTrigger className="w-full py-7 pl-9">
                      <SelectValue placeholder="select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="kano">Kano</SelectItem>
                      <SelectItem value="oyo">Oyo</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2 absolute top-5 -left-3 px-6 ">
                    <MapPin size={20} />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                children="Search"
                className="bg-lightBlue h-[55px] lg:ml-5 hover:bg-lightBlue"
              />
            </Form>
          );
        }}
      </Formik>
      {/* <form className="grid gap-3 lg:gap-0 lg:grid-flow-col lg:grid-cols-[85%_15%] items-center bg-lightGray">
        <div className="grid gap-3 lg:gap-0 md:grid-cols-[65%_35%] items-center lg:bg-white">
          <Input
            name=""
            type="search"
            className="h-[55px] w-full px-8 rounded-lg border-none font-[400]"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleSearch(e.target.value)
            }
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
      </form> */}
    </div>
  );
};

export default Search;
