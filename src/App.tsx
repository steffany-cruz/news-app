import { useLayoutEffect, useState, useContext, Fragment } from "react";
import "./App.css";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Header from "./components/Header";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import { NewsContext, NewsProvider } from "./context/NewsContext";
import { INews } from "./types/news";
import { getNews, getSources } from "./service/news";
import Dropdown from "./components/Dropdown";
import Headline from "./components/Headline";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewsProvider>
        <NewsApp />
      </NewsProvider>
    </QueryClientProvider>
  );
}

function NewsApp() {
  const {
    sources,
    selectedSource,
    setSelectedSource,
    setSources,
    currentPage,
    setCurrentPage,
  } = useContext(NewsContext);
  const [totalPages, setTotalPages] = useState(10);
  const [headline, setHeadline] = useState<INews>();
  const [error, setError] = useState();

  useLayoutEffect(() => {
    async function fetchSources() {
      try {
        const { data } = await getSources();
        setSources(data.sources);
        setSelectedSource(data.sources[1] || data.sources[0]);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
      }
    }

    fetchSources();

    return () => {
      setHeadline(undefined);
      setTotalPages(0);
      setCurrentPage(1);
    };
  }, []);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["news", selectedSource, currentPage],
    enabled: !!selectedSource,
    queryFn: async () => {
      const { data } = await getNews(selectedSource?.id, currentPage);
      setTotalPages(Math.floor(data.totalResults / 12));
      if (currentPage === 1) {
        setHeadline(data.articles[0]);
        delete data.articles[0];
      }
      return data.articles;
    },
  });

  return (
    <>
      <Header />
      <div className="p-4 h-full">
        <div className="lg:flex items-center">
          <div className="flex items-center mb-5">
            <div className="border-2 border-cyan-900 mr-3 h-6"></div>
            <p className="text-lg font-medium">Últimas notícias</p>
          </div>
          <Dropdown
            selected={selectedSource}
            onSelect={setSelectedSource}
            options={sources}
          />
        </div>
        {(isLoading || isFetching) && (
          <div className="flex justify-center items-center mt-10 w-full h-full">
            <div className="animate-spin rounded-full my-20 h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        )}

        {data?.length === 0 && !(isLoading || isFetching) && (
          <div className="flex justify-center items-center my-20 mt-10 w-full h-full">
            <p className="text-lg font-medium text-gray-500">
              Nenhuma notícia encontrada nesta fonte.
            </p>
          </div>
        )}

        {(!!error || isError) && !data && (
          <div className="flex justify-center items-center my-20 w-full h-full">
            <p className="text-lg font-medium text-red-500 w-1/2">
              Ocorreu um erro ao carregar as notícias
              <p>{error}</p>
            </p>
          </div>
        )}
        {headline && !(error || isError) && !(isLoading || isFetching) && (
          <Headline
            title={headline?.title}
            description={headline?.description}
            urlToImage={headline?.urlToImage}
            publishedAt={headline?.publishedAt}
            url={headline?.url}
            source={headline?.source}
          />
        )}
        <div className="pt-5 grid sm:grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-5 w-full">
          {!(isLoading || isFetching) &&
            data?.map((news: INews) => (
              <Card
                key={news.url}
                title={news.title}
                description={news.description}
                urlToImage={news.urlToImage}
                publishedAt={news.publishedAt}
                url={news.url}
                source={news.source}
              />
            ))}
        </div>
        {data?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
}

export default App;
