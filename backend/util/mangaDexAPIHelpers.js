function extractData(data) {
  const attributes = data.attributes;
  const author = extractAuthor(data.relationships);
  const coverArtFileName = extractCoverArtId(data.relationships);

  return {
    title: attributes.title.en ?? Object.values(attributes.title)[0],
    description:
      attributes.description.en ?? Object.values(attributes.description)[0],
    volumes: Number(attributes.lastVolume) ?? 0,
    chapters: Number(attributes.lastChapter) ?? 0,
    year: attributes.year ?? "N/A",
    type: data.type.toUpperCase(),
    mangaDexId: data.id,
    tags: attributes.tags.map((t) => t.attributes.name.en),
    coverArt:
      coverArtFileName != "N/A"
        ? `https://uploads.mangadex.org/covers/${data.id}/${coverArtFileName}`
        : "N/A",
    author: author,
  };
}

//helper function to the the cover_art id
function extractCoverArtId(relationships) {
  const cover_art = relationships.find((r) => r.type === "cover_art");
  return cover_art.attributes.fileName ?? "N/A";
}

function extractAuthor(relationships) {
  const author = relationships.find((r) => r.type === "author");
  return author.attributes.name ?? "N/A";
}

export { extractData };
