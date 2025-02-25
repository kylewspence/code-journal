interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  'photo-url': HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface Entry {
  title: string;
  photoUrl: string;
  notes: string;
  entryId: number;
}

const $inputUrl = document.querySelector('#photo-url') as HTMLInputElement;
const $imgPreview = document.querySelector(
  '.preview-image',
) as HTMLImageElement;
if (!$inputUrl) throw new Error('no input img');
if (!$imgPreview) throw new Error('no preview');

$inputUrl?.addEventListener('input', () => {
  $imgPreview?.setAttribute('src', $inputUrl.value);
});

const $formElement = document.querySelector('form') as HTMLFormElement;
if (!$formElement) throw new Error('no form');

$formElement.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $formElement.elements as FormElements;
  const newEntry: Entry = {
    title: $formElements.title.value,
    photoUrl: $formElements['photo-url'].value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  writeData();
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formElement.reset();
});
