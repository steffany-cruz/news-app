import api from "./api";

export async function getSources(country = "br") {
  return api.get(`/top-headlines/sources?country=${country}&language=pt`);
}

export async function getNews(
  selectedSource: string | undefined,
  page = 1,
  language = "pt",
  pageSize = 12
) {
  const from = new Date();
  from.setDate(from.getDate() - 1);
  const formattedFrom = from.toISOString().split("T")[0];
  return api.get(
    `/everything?${
      selectedSource ? `sources=${selectedSource}&` : ""
    }language=${language}&pageSize=${pageSize}&page=${page}&from=${formattedFrom}&to=${formattedFrom}`
  );
}
