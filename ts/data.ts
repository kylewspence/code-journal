interface Data {
  view: string;
  entries: Entry[];
  editing: Entry | null;
  nextEntryId: number;
}

const data: Data = readData();

function writeData(): void {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('entries-storage', jsonData);
}

function readData(): Data {
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
