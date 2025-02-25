'use strict';
const data = readData();
function writeData() {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('entries-storage', jsonData);
}
function readData() {
  const jsonData = localStorage.getItem('entries-storage');
  if (!jsonData) {
    return {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
  } else {
    const parsedData = JSON.parse(jsonData);
    return parsedData;
  }
}
