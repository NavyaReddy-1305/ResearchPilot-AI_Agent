const axios = require("axios");
const xml2js = require("xml2js");

exports.searchArxiv = async (query) => {
  const url = `http://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=5`;

  const response = await axios.get(url);
  const parsed = await xml2js.parseStringPromise(response.data);

 return parsed.feed.entry.map((paper) => ({
  id: paper.id[0],
  title: paper.title[0].trim(),
  summary: paper.summary[0].trim(),
  authors: paper.author.map((a) => a.name[0]),
  publishedDate: paper.published[0],
  link: paper.id[0],
}));

};
