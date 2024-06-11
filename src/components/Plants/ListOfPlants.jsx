import PlantCard from "./PlantCard";
import { useCallback, useContext, useEffect, useState } from "react";
import Search from "../DataFilters/Search/Search";
import CategoryFilter from "../DataFilters/Category/CategoryFilter";
import Error from "../Misc/Error";
import Loader from "../Misc/loader";
import { CrystallizeClient } from "../../data/CrystallizeClient/CrystallizeClient";
import { DropDownMenuContext } from "../../context/context";
import fetchEverything from "../../data/fetchEverything";
import fetchPlantData from "../../data/fetchPlantData";
import { useTranslation } from "react-i18next";
import NoPlantsFound from "../Misc/NoPlantsFound";
export default function ListOfPlants() {
  const [folder, setFolder] = useState([]);
  const [category, setCategory] = useState("");
  const [plants, setPlants] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setIsDisabled } = useContext(DropDownMenuContext);
  const { t } = useTranslation();

  // console.log(process.env.PUBLIC_API_PATH)



  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        const folderData = await fetchEverything(
          CrystallizeClient,
          t("plantGuidePath"),
          "published",
          t("lang")
        );
        setFolder(folderData?.subtree?.edges);
        if (t("plantGuidePath") || folderData?.subtree?.edges?.length > 0) {
          setCategory(
            t("plantGuidePath")
              ? t("plantGuidePath")
              : folderData.subtree.edges[0]?.node?.path
          );
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsDisabled(false);
        setIsLoading(false);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [t, setIsDisabled]);

  useEffect(() => {
    async function fetchData() {
      if (category) {
        try {
          const plantData = await fetchPlantData(
            CrystallizeClient,
            category.toLocaleString(),
            "published",
            t("lang"),
            category,
            t("plantGuidePath")
          );
          
          const types = plantData?.subtree?.edges?.map(
            (edge) => edge?.node?.type
          );
          if (types?.includes("document")) {
            return setPlants(plantData?.subtree?.edges);
          }

          if (types?.includes("folder")) {
            return setPlants(
              plantData?.subtree?.edges?.flatMap((folder) => {
                return folder?.node?.subtree?.edges;
              })
            );
          }
        } catch (error) {
          setIsError(true);
          console.log(error);
        }
      }
    }
    fetchData();
  }, [category, t]);

  const renderPlants = plants?.filter((itemA) => {
    if (itemA?.node?.name?.toLowerCase().includes(query.toLowerCase())) {
      if(itemA.node.id === "65f5c043dc43f1a0400eb885"){
        itemA.node.productId = "541577"
        
      }else if(itemA.node.id === "65f5c043dc43f1a0400eb886"){
        itemA.node.productId = "520896"
      
      }else if(itemA.node.id === "65f5c044dc43f1a0400eb887"){
        itemA.node.productId = "529794"
        
      }
      return itemA;
    }
  });
  console.log(renderPlants);

  return (
    <>
      {isError && <Error />}
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 lg:gap-5">
            <Search query={query} setQuery={setQuery} />
            <CategoryFilter
              folder={folder}
              setFolder={setFolder}
              setCategory={setCategory}
              setQuery={setQuery}
            />
          </div>
          {renderPlants.length < 1 && query.length > 2 ? (
            <NoPlantsFound query={query} />
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-5">
              {renderPlants?.map((item, index) => {
                return <PlantCard key={index} plantData={item} />;
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
