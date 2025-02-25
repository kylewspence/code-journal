'use strict';
const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
// local storage
function writeEntries() {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('entries-storage', jsonData);
}
function readEntries() {
  const jsonEntries = localStorage.getItem('entries-storage');
  if (!jsonEntries) {
    return data.entries;
  } else {
    return JSON.parse(jsonEntries);
  }
}
