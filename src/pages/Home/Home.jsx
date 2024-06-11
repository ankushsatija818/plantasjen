import { Suspense, lazy } from "react";
import Loader from "../../components/Misc/loader";
const ListOfPlants = lazy(() => import("../../components/Plants/ListOfPlants"));

export default function Home() {
  return (
    <section className="min-h-screen">
      <Suspense fallback={<Loader />}>
        <ListOfPlants />
      </Suspense>
    </section>
  );
}
