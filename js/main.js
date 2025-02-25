'use strict';
const $inputUrl = document.querySelector('#photo-url');
const $imgPreview = document.querySelector('.preview-image');
if (!$inputUrl) throw new Error('no input img');
if (!$imgPreview) throw new Error('no preview');
$inputUrl?.addEventListener('input', () => {
  $imgPreview?.setAttribute('src', $inputUrl.value);
});
const $formElement = document.querySelector('form');
if (!$formElement) throw new Error('no form');
$formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $formElement.elements;
  const newEntry = {
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
