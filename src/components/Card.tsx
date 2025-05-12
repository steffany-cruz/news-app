import { FC, useCallback, useMemo } from "react";
import { INews } from "../types/news";

const Card: FC<INews> = ({
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
    window.open(url, "_blank");
  }, [url]);

  return (
    <div className="md:flex items-center border border-gray-100 rounded-sm shadow-md hover:shadow-gray-400 transition-shadow duration-300">
      <img
        className="w-full md:w-1/3 lg:w-1/3 h-60 md:h-100 lg:h-50 object-contain xl:object-cover"
        src={urlToImage}
        alt={title}
      />
      <div className="flex flex-col w-full p-4">
        <p className="text-lg font-bold text-cyan-700">{title}</p>
        <p className="text-gray-700 font-medium">{source?.name}</p>
        <p className="mt-2 text-gray-700 line-clamp-2">{description}</p>
        <p className="mt-3 mb-2 ml-auto text-gray-500 text-sm">
          {formattedDate}
        </p>
        <button
          className="mt-2 px-2 py-2 bg-cyan-700 text-white rounded-md hover:bg-cyan-800 cursor-pointer"
          onClick={handleReadMore}
        >
          Leia mais
        </button>
      </div>
    </div>
  );
};

export default Card;
