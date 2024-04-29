import Dashboard from "@/components/custom/dashboard";
import Loader from "@/components/custom/loader";
import { Suspense } from "react";

const Home = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    </>
  );
};

export default Home;
