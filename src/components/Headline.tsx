import { FC, useCallback, useMemo } from "react";
import { INews } from "../types/news";

const Headline: FC<INews> = ({
  title,
  description,
  url,
  urlToImage,
  source,
  publishedAt,
}) => {
  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  }

  const formattedDate = useMemo(() => formatDate(publishedAt), [publishedAt]);

  const handleReadMore = useCallback(() => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  }, [url]);

  return (
    <section className="lg:flex lg:mx-auto p-6 gap-6 mb-6 mt-2 lg:w-full xl:w-300 xxl:w-2/3 lg:h-100 border border-gray-100 rounded-sm shadow-md hover:shadow-gray-400 transition-shadow duration-300">
      <img src={urlToImage} alt="headline" className="w-140 rounded-lg" />
      <div>
        <h1 className="text-lg font-bold text-gray-900 mb-2">
          <span className="bg-yellow-500 rounded-sm px-5">Destaque</span>
        </h1>
        <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-lg xl:text-xl text-gray-700 mb-4">{description}</p>
        <p className="text-md text-gray-500 font-medium mt-20">
          {source?.name} - {formattedDate}
        </p>
        <div className="flex w-full lg:justify-evenly">
          <button
            onClick={handleReadMore}
            className="w-100 mt-5 p-2 bg-cyan-700 text-white rounded-md hover:bg-cyan-800 cursor-pointer"
          >
            Leia mais
          </button>
        </div>
      </div>
    </section>
  );
};

export default Headline;
