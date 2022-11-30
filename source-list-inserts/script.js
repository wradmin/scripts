"use strict";
const form = document.querySelector("form");
const inputElem = document.querySelector("#input");
const resultElem = document.querySelector("#result");
const rowNumberElem = document.querySelector("#rowNumber");
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const allowedFieldNames = [
    "link",
    "country_iso",
    "agency_name",
    "license_url",
    "license_type",
    "feed_group_name",
    "feed_name",
    "link_type",
    "parent_link",
    "feed_group_id",
    "data_type",
    "rules",
    "public_link",
    "country",
    "state",
    "city",
];
form === null || form === void 0 ? void 0 : form.addEventListener("input", (evt) => {
    const inputFields = inputElem === null || inputElem === void 0 ? void 0 : inputElem.value.split("\t").map((name, i) => [name, alphabet[i]]).filter(([name]) => allowedFieldNames.includes(name));
    const columnNames = inputFields === null || inputFields === void 0 ? void 0 : inputFields.map(([column]) => column).join(",");
    const columnLetters = inputFields === null || inputFields === void 0 ? void 0 : inputFields.map(([_, letter]) => letter).map((letter) => `'"&${letter}${rowNumberElem === null || rowNumberElem === void 0 ? void 0 : rowNumberElem.value}&"'`).join(",");
    const result = `="INSERT INTO sources_work.source_list (${columnNames}) VALUES (${columnLetters})"`;
    resultElem.value = result;
});
const inputEvent = new Event('input', {
    bubbles: true,
    cancelable: true,
});
form === null || form === void 0 ? void 0 : form.dispatchEvent(inputEvent);
