import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import Error from "../Misc/Error";
import { useContext, useEffect, useState } from "react";
import { ContentTransformer, Image } from "@crystallize/reactjs-components";
import fetchPlant from "../../data/fetchPlant";
import { CrystallizeClient } from "../../data/CrystallizeClient/CrystallizeClient";
import {
  findPlantImage,
  findPlantImageVariants,
} from "./PlantData/findPlantImage";
import { DropDownMenuContext } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { AddProductCount } from "./AddProductCount";

export default function PlantPage() {
  let { folder, id } = useParams();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("productId")
  const location = useLocation();
  const { setIsDisabled } = useContext(DropDownMenuContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [plantData, setPlantData] = useState([]);
  const { t } = useTranslation();
  const [count,setCount] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchPlant(
          CrystallizeClient,
          `${t("plantGuidePath")}/${folder}/${id}`,
          t("lang"),
          "published"
        );
        return setPlantData(data);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsDisabled(true);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [folder, id, setIsDisabled, t]);

  const plantTitle = plantData?.name;
  const latinTitle = plantData?.components?.map((comp) => {
    return comp?.content?.text;
  });
  const plantImage = findPlantImage(plantData);
  const plantImageVariants = findPlantImageVariants(plantData);

  const imageFromCrystallize = {
    url: plantImage?.[1],
    variants: plantImageVariants?.[1]?.[0],
  };

  useEffect(() => {
    if (plantTitle) {
      document.title = `${plantTitle}`;
    }
    if (location) {
      window.scroll(0, 0);
    }
  }, [plantTitle, location]);

  return (
    <>
      {(isError || id === "undefined") && <Error />}
      {!isLoading && id !== "undefined" && (
        <section className="min-h-screen">
          <div className="flex flex-col gap-[25px] lg:gap-[25px]">
            <Link
              to={"/"}
              className="flex gap-3 items-center hover:text-black text-gray-400 w-fit"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <span>{t("breadcrumb")}</span>
            </Link>
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-[35px]">
              <div id="image" className="flex-1">
                <Image
                  {...imageFromCrystallize}
                  sizes="(max-width: 400px) 100w, 700px"
                />
              </div>
              <div className="flex flex-col gap-5 flex-1">
                <div>
                  <h1 className="text-2xl md:text-5xl">{plantTitle}</h1>
                  <h2 className="italic mt-2 opacity-50">
                    {latinTitle ? latinTitle : "No Latin Name Given"}
                  </h2>
                </div>
                <div className="leading-8">
                  
                  {plantData?.components?.map((comp, index) => {
                    return (
                      <ContentTransformer
                        key={index}
                        json={comp?.content?.json}
                      />
                    );
                  })}
                </div>
               
                <AddProductCount setCount={setCount} count={count} productId={productId} name={id} />
              </div>
            </div>
            <AccordionList data={plantData} />
          </div>
        </section>
      )}
    </>
  );
}

function AccordionList({ data }) {
  const [curOpen, setIsOpen] = useState(null);
  return (
    <div>
      {data?.components?.map((comp) => {
        return comp?.content?.chunks?.map((chunkItem, chunkIndex) => {
          return chunkItem?.map((item, index) => {
            if (item?.content !== null) {
              return (
                <AccordionItem
                  key={index}
                  itemData={item}
                  curOpen={curOpen}
                  onOpen={setIsOpen}
                  num={index}
                >
                  {chunkIndex > 0 || index > 0 ? <hr /> : null}
                </AccordionItem>
              );
            }
          });
        });
      })}
    </div>
  );
}

function AccordionItem({ itemData, curOpen, onOpen, num, children }) {
  const isOpen = num === curOpen;
  const { t } = useTranslation();

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <>
      {children}
      <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
        <p className="title">{t(itemData?.id)}</p>{" "}
        <p className="icon">{isOpen ? "-" : "+"}</p>
        {isOpen && (
          <div className="content-box">
            <ContentTransformer json={itemData?.content?.json} />
          </div>
        )}
      </div>
    </>
  );
}
