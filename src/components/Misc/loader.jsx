import loaderGif from "../../assets/loader/loading-bar-932_128.gif";

export default function Loader() {
  return (
    <section className="h-screen">
      <div className="flex justify-center items-center h-[100vh] w-[100vw] fixed top-0 left-0 z-50">
        <img
          className="col-span-2 md:col-span-3 xl:col-span-4"
          src={loaderGif}
          alt="Loading..."
        />
      </div>
    </section>
  );
}
