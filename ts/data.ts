const data = {
  view: 'entry-form',
  entries: readData(),
  editing: null,
  nextEntryId: 1,
};

// local storage

function writeData(): void {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('entries-storage', jsonData);
}

function readData(): Entry[] {
  const jsonEntries = localStorage.getItem('entries-storage');
  if (!jsonEntries) {
    return data.entries;
  } else {
    return JSON.parse(jsonEntries);
  }
}
