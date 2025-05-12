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
  return api.get(
    `/everything?${
      selectedSource ? `sources=${selectedSource}&` : ""
    }language=${language}&pageSize=${pageSize}&page=${page}`
  );
}
