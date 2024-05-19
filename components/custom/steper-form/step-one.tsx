"use client";
import { getCountryName, getCountryStates } from "@/app/store/thunk";
import FormikController from "@/components/custom/formikController";
import Loader from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "@/context";
import { countryByNameValidationSchema } from "@/lib/schema/country";
import {
  StepOneJobPostFormValues,
  stepOneJobPostValidationSchema,
} from "@/lib/schema/post-job";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { truncate } from "@/utils/helper";
import { Form, Formik } from "formik";
import {
  Briefcase,
  Building2,
  Captions,
  DollarSign,
  History,
  LaptopMinimal,
  Link,
  Locate,
  MapPin,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ZodError } from "zod";

type IState = {
  name: string;
  status_code: string;
};

const CreateJob = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [coordinates, setCoordinate] = useState({ lat: 0, lng: 0 });
  const { country, states } = useAppSelector((state) => state.rootReducer.jobs);
  const { formValues, setFormValues } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const validateForm = (values: StepOneJobPostFormValues) => {
    try {
      stepOneJobPostValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const { lat, lng } = pos;
          setCoordinate({ lat, lng });
        },
      );
    }
  }, []);

  const countryChange = useDebouncedCallback((query: { country: string }) => {
    if (query.country) {
      dispatch(getCountryStates({ country: query.country }));
    }
  }, 500);

  useEffect(() => {
    if (coordinates.lat <= 0 || coordinates.lng <= 0) return;
    else {
      dispatch(getCountryName({ lat: coordinates.lat, lng: coordinates.lng }));
    }
  }, [dispatch, coordinates.lat, coordinates.lng]);

  useEffect(() => {
    if (!country) return;
    else {
      dispatch(getCountryStates({ country }));
    }
  }, [dispatch, country]);

  const localStorageFormValues: StepOneJobPostFormValues =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("formValues") || "{}");

  const handleSubmit = async (values: StepOneJobPostFormValues) => {
    const formData = new FormData();
    formData.append("file", image as File);
    formData.append("upload_preset", "weather");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env
          .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const res = await response.json();
      setUrl(res.public_id);
    } catch (error) {
      return;
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      jobTitle: values.jobTitle,
      jobType: values.jobType,
      salary: values.salary,
      hired: values.hired,
      companyName: values.companyName,
      location: values.location,
      country: values.country,
      position: values.position,
      experience: values.experience,
      applicationLink: values.applicationLink,
      imageSrc: values?.imageSrc,
    }));
    localStorage.setItem("formValues", JSON.stringify(values));
    router.push(`${pathname}?step=2`);
  };

  return (
    <>
      <div className="w-full md:w-[90%] mx-auto">
        <Button
          className="!bg-transparent !text-deepBlue"
          onClick={() => {
            router.push("/dashboard/post-job?step=2");
          }}
        >
          Next
        </Button>
      </div>
      <div className="flex flex-col items-center justify-around h-[80vh] md:h-full overflow-y-scroll p-5 md:p-10">
        <div className="w-full">
          <Formik
            initialValues={{
              jobTitle: localStorageFormValues?.jobTitle ?? formValues.jobTitle,
              jobType: localStorageFormValues?.jobType ?? "fulltime",
              salary: localStorageFormValues?.salary ?? formValues?.salary,
              hired: localStorageFormValues?.hired ?? formValues?.hired,
              companyName:
                localStorageFormValues?.companyName ?? formValues?.companyName,
              location:
                localStorageFormValues?.location ?? formValues?.location,
              country: localStorageFormValues?.country ?? country,
              position: localStorageFormValues?.position ?? "Remote",
              experience: localStorageFormValues?.experience ?? "Intermediate",
              applicationLink:
                localStorageFormValues?.applicationLink ??
                formValues?.applicationLink,
              imageSrc:
                localStorageFormValues?.imageSrc ?? url
                  ? url
                  : `https://res.cloudinary.com/dgvoxqjr2/image/upload/v1712431616/samples/landscapes/beach-boat.jpg`,
            }}
            validate={validateForm}
            onSubmit={handleSubmit}
            validateOnChange
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <div
                    className={`flex flex-col ${formik.isValid ? "gap-4" : "gap-2"} w-full`}
                  >
                    <div className="flex flex-col md:flex-row w-full md:w-[95%] mx-auto gap-4">
                      <div className="relative w-full">
                        <FormikController
                          control="input"
                          type="text"
                          placeholder={
                            localStorageFormValues?.jobTitle ?? "job title"
                          }
                          name="jobTitle"
                          value={formik.values.jobTitle}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="border-[1.5px] border-gray-200 !py-7 pl-12"
                        />
                        <div className="absolute top-4 left-4">
                          <Captions size={25} />
                        </div>
                      </div>
                      <div className="relative w-full">
                        <FormikController
                          control="input"
                          type="text"
                          placeholder={
                            localStorageFormValues?.companyName ??
                            "company name"
                          }
                          name="companyName"
                          value={formik.values.companyName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="border-[1.5px] border-gray-200 !py-7 pl-12"
                        />
                        <div className="absolute top-5 left-4">
                          <Building2 size={20} />
                        </div>
                      </div>

                      <div className="w-full relative">
                        <FormikController
                          control="input"
                          name="salary"
                          min="10"
                          value={formik.values.salary}
                          type="number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={
                            localStorageFormValues?.salary ?? "salary"
                          }
                          className="border-[1.7px] border-gray-300 !py-7 pl-12 "
                        />
                        <div className="absolute top-5 left-4">
                          <DollarSign size={20} />
                        </div>
                      </div>
                      <div className="w-[70%] relative">
                        <FormikController
                          control="input"
                          name="hired"
                          min="0"
                          type="number"
                          value={formik.values.hired}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={
                            localStorageFormValues?.hired ?? "no of hires"
                          }
                          className="border-[1.7px] border-gray-300 !py-7 pl-12 "
                        />
                        <div className="absolute top-4 left-4">
                          <Users />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full md:w-[95%] mx-auto gap-4 py-4">
                      <div className="!py-2 w-full relative flex items-center border-[1.7px] border-gray-300 rounded-lg">
                        <Select
                          name="jobType"
                          value={formik.values.jobType}
                          onValueChange={(value: string) => {
                            formik.setFieldValue("jobType", value);
                          }}
                        >
                          <SelectTrigger className="w-full pl-14 font-light">
                            <SelectValue
                              placeholder="JobType"
                              className="!font-light"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="fulltime"
                              className="cursor-pointer font-light"
                            >
                              FullTime
                            </SelectItem>
                            <SelectItem
                              value="parttime"
                              className="cursor-pointer font-light"
                            >
                              PartTime
                            </SelectItem>
                            <SelectItem
                              value="internship"
                              className="cursor-pointer font-light"
                            >
                              Internship
                            </SelectItem>
                            <SelectItem
                              value="volunteer"
                              className="cursor-pointer font-light"
                            >
                              Volunteer
                            </SelectItem>
                            <SelectItem
                              value="contract"
                              className="cursor-pointer font-light"
                            >
                              Contract
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="absolute left-4">
                          <Briefcase />
                        </div>
                      </div>
                      <div className="!py-2 w-full relative flex items-center border-[1.7px] border-gray-300 rounded-lg">
                        <Select
                          name="experience"
                          value={formik.values.experience}
                          onValueChange={(value: string) => {
                            formik.setFieldValue("experience", value);
                          }}
                        >
                          <SelectTrigger className="w-full pl-14 font-light">
                            <SelectValue
                              placeholder="experience"
                              className="!font-light"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="Fresh"
                              className="cursor-pointer font-light"
                            >
                              Fresh
                            </SelectItem>
                            <SelectItem
                              value="Beginner"
                              className="cursor-pointer font-light"
                            >
                              Beginner
                            </SelectItem>
                            <SelectItem
                              value="Intermediate"
                              className="cursor-pointer font-light"
                            >
                              Intermediate
                            </SelectItem>
                            <SelectItem
                              value="Expert"
                              className="cursor-pointer font-light"
                            >
                              Expert
                            </SelectItem>
                            <SelectItem
                              value="Guru"
                              className="cursor-pointer font-light"
                            >
                              Guru
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="absolute top-5 left-4">
                          <History size={20} />
                        </div>
                      </div>
                      <div className="!py-2 w-full relative flex items-center border-[1.7px] border-gray-300 rounded-lg">
                        <Select
                          name="position"
                          value={formik.values.position}
                          onValueChange={(value: string) => {
                            formik.setFieldValue("position", value);
                          }}
                        >
                          <SelectTrigger className="w-full pl-14 font-light">
                            <SelectValue
                              placeholder="position"
                              className="!font-light"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="Remote"
                              className="cursor-pointer font-light"
                            >
                              Remote
                            </SelectItem>
                            <SelectItem
                              value="Onsite"
                              className="cursor-pointer font-light"
                            >
                              Onsite
                            </SelectItem>
                            <SelectItem
                              value="Hybrid"
                              className="cursor-pointer font-light"
                            >
                              Hybrid
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="absolute top-5 left-4">
                          <LaptopMinimal size={20} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full md:w-[95%] mx-auto gap-4">
                      <div className="relative  w-full">
                        <FormikController
                          control="input"
                          type="text"
                          placeholder={
                            localStorageFormValues?.country ?? country
                          }
                          name="country"
                          value={formik.values.country}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            countryChange({ country: e.target.value });
                            formik.handleChange(e);
                          }}
                          onBlur={formik.handleBlur}
                          className="border-[1.5px] border-gray-200 !py-7 pl-12"
                        />
                        <div className="absolute top-5 left-4">
                          <MapPin size={20} />
                        </div>
                      </div>
                      <div className="!py-2 w-full relative flex items-center border-[1.7px] border-gray-300 rounded-lg">
                        <Select
                          name="location"
                          value={formik.values.location}
                          onValueChange={(value: string) => {
                            formik.setFieldValue("location", value);
                          }}
                        >
                          <SelectTrigger className="w-full pl-14 font-light">
                            {/* <div>{formik.values.location}</div> */}
                            {/* <SelectValue
                              placeholder="location"
                              // className="!font-light"
                            /> */}
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem
                              value="Remote"
                              className="cursor-pointer font-light"
                            >
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

                        <div className="absolute top-5 left-4">
                          <Locate size={20} />
                        </div>
                      </div>
                      <div className="relative w-full">
                        <FormikController
                          control="input"
                          type="text"
                          placeholder="applicationLink"
                          name="applicationLink"
                          value={formik.values.applicationLink}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="border-[1.5px] border-gray-200 !py-7 pl-12"
                        />
                        <div className="absolute top-5 left-4">
                          <Link size={20} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full md:w-[95%] mx-auto gap-4 mt-4">
                      <div>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                        >
                          <Button
                            type="button"
                            className="mx-auto py-6 bg-lightBlue hover:bg-deepBlue text-sm !rounded-lg"
                          >
                            Upload Company Logo
                          </Button>
                          <p
                            className={`text-left ${image?.name ? "" : "text-red-500"}`}
                          >
                            {image
                              ? truncate(image?.name, 10)
                              : "No file selected"}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          ref={fileInputRef}
                          accept="image/jpeg, image/png, image/jpg, image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setImage(e.target.files[0]);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={!formik.isValid}
                    className="my-6 w-full md:w-[40%] mx-auto !disabled:cursor-not-allowed py-7 bg-deepBlue hover:bg-deepBlue transition-all ease-in-out duration-500 flex items-center gap-2"
                  >
                    {formik.isSubmitting && <Loader />}
                    Save & Continue
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateJob;
