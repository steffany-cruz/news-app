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
  const [error, setError] = useState();

  useLayoutEffect(() => {
    async function fetchSources() {
      try {
        const { data } = await getSources();
        setSources(data.sources);
        setSelectedSource(data.sources[1] || data.sources[0]);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    }

    fetchSources();
  }, []);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["news", selectedSource, currentPage],
    enabled: !!selectedSource,
    queryFn: async () => {
      const { data } = await getNews(selectedSource?.id, currentPage);
      setTotalPages(Math.floor(data.totalResults / 12));
      return data.articles;
    },
  });

  return (
    <>
      <Header />
      <div className="p-4 h-full">
        <div className="flex items-center">
          <Fragment>
            <div className="border-2 border-cyan-900 mx-4 h-6"></div>
            <p className="text-lg font-medium">Últimas notícias</p>
          </Fragment>
          {/* <Dropdown
            selected={selectedSource}
            onSelect={setSelectedSource}
            options={[
              { id: "aaa", name: "aaa" },
              { id: "bbb", name: "bbb" },
              { id: "ccc", name: "ccc" },
            ]}
          /> */}
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
          {/* {Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              <Card
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                urlToImage={
                  index % 2 === 0
                    ? "https://s2-valor.glbimg.com/MnpLEBw3DuHLBA95IA--PY-TlIM=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2025/b/v/2V7mxeRkGvAwNepi9PPg/foto05esp-101-shannon-a18.jpg"
                    : "https://media.zenfs.com/en/coindesk_75/f96b0ae84958f9e2bfc7699e720a9f0e"
                }
                publishedAt="2023-10-01T12:00:00Z"
                url="https://example.com"
              />
            </div>
          ))} */}
        </div>
        {/* {data?.length > 0 && ( */}
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
        {/* )} */}
      </div>
    </>
  );
}

export default App;
