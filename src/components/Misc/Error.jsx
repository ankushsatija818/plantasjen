import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import fetchError from "../../data/fetchError";
import { CrystallizeClient } from "../../data/CrystallizeClient/CrystallizeClient";
import Loader from "./loader";
import { ContentTransformer } from "@crystallize/reactjs-components";

export default function Error() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchError(
          CrystallizeClient,
          t("errorPath"),
          t("lang"),
          "published"
        );
        return setErrorData(data?.components);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [t]);

  const errorImage = errorData?.flatMap((content) => {
    return content?.content?.images?.map((image) => {
      return image?.url;
    });
  });
  const errorTitle = errorData?.flatMap((title) => {
    return title?.content?.text;
  });
  const errorDescriptionTitle = errorData?.flatMap((desc) => {
    return desc?.content?.paragraphs?.map((text) => {
      return text?.title?.text;
    });
  });
  const errorDescriptionText = errorData?.flatMap((desc) => {
    return desc?.content?.paragraphs?.map((text) => {
      return text?.body?.json;
    });
  });

  return (
    <>
      {isLoading && <Loader />}
      <section className="flex justify-center my-[25px]">
        {!isLoading && (
          <div className="flex flex-col justify-center items-center lg:w-[700px] gap-10">
            <img src={errorImage[2]} alt="" />
            <h1 className="text-2xl lg:text-3xl font-bold text-center">
              {errorTitle[0]}
            </h1>
            <div className="flex flex-col gap-3">
              <h3>{errorDescriptionTitle}</h3>
              {<ContentTransformer json={errorDescriptionText[4]} />}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
