import { countryISO } from "./coutrty-iso.js";

genBtn.addEventListener("click", async (evt) => {
  const agencies = await fetch("./files/agencies.json")
    .then((r) => r.json())
    .then((data) => data);
  const feeds = await fetch("./files/feeds.json")
    .then((r) => r.json())
    .then((data) => data);

  const feedLinks = feeds
    // .slice(0,100)
    .map((feed) => feed.urls.static_current)

  const uniqueFeedLinks = [...new Set(feedLinks)];

  const uniqueFeeds = uniqueFeedLinks.map((link) =>
    feeds.find((feed) => feed.urls.static_current === link)
  );

  // uniqueFeeds.slice(0, 1).forEach(async (feed, i) => {
  uniqueFeeds.forEach((feed, i) => {
    const feedID = feed.id;
    const feedOnestopId = feed.onestop_id;
    const feedTransitLandURL = `https://www.transit.land/feeds/${feedOnestopId}`;
    const feedDirectLoadLink = feed.urls.static_current || null;
    const feedLicenseUrl = feed.license.url || "";
    const feedLicenseType = feed.license.spdx_identifier || "";
    
    const agency = agencies.find((agency) =>
      agency.operator?.feeds?.some((feed) => feed.id === feedID)
    );
    if (!agency) return;
    const agencyName = agency.agency_name;
    const agencyOfficialURL = agency.agency_url;
    const agencyTransitLandURL = `https://www.transit.land/operators/${agency.onestop_id}`;
    let country, state, city;
    if (agency.places) {
      [country, state, city] = Object.values(agency.places[0]);
    }
    city = city === state ? "" : city;
    
    const columns = {
      // agencyOfficialURL: agencyOfficialURL,
      // agencyTransitLandURL: agencyTransitLandURL,
      source_page: feedTransitLandURL,
      link: feedDirectLoadLink,
      country_iso: countryISO[country] || "",
      agency_name: agencyName,
      license_url: feedLicenseUrl,
      license_type: feedLicenseType,
      processed: "",
      feed_group_name: "",
      feed_name: "",
      link_type: "direct_gtfs_zip",
      parent_link: "",
      comment: "",
      proxy: "",
      feed_group_id: "",
      country: country || "",
      state: state || "",
      city: city || "",
    };

    if (i === 0) {
      theadRow.insertAdjacentHTML(
        "beforeEnd",
        `<tr>${Object.keys(columns)
          .map((col) => `<th>${col}</th>`)
          .join("")}</tr>`
      );
    }

    tbody.insertAdjacentHTML(
      "beforeEnd",
      `<tr>${Object.values(columns)
        .map((col) => `<td>${col}</td>`)
        .join("")}</tr>`
    );
  });
});
