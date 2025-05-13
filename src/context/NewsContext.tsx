import { createContext, useState, Dispatch, SetStateAction } from "react";
import { ISource } from "../types/news";

const NewsContext = createContext<{
  selectedSource: ISource | undefined;
  setSelectedSource: Dispatch<SetStateAction<ISource | undefined>>;
  sources: ISource[];
  setSources: Dispatch<SetStateAction<ISource[]>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}>({
  selectedSource: undefined,
  setSelectedSource: () => {},
  sources: [],
  setSources: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

const NewsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedSource, setSelectedSource] = useState<ISource>();
  const [sources, setSources] = useState<ISource[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <NewsContext.Provider
      value={{
        selectedSource,
        setSelectedSource,
        sources,
        setSources,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsProvider };
