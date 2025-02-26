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
  const li = renderEntry(newEntry);
  $ul?.prepend(li);
  viewSwap('entries');
  toggleNoEntries();
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formElement.reset();
});
function renderEntry(entry) {
  const li = document.createElement('li');
  li.classList.add('row');
  const img = document.createElement('img');
  img.classList.add('column-half');
  img.setAttribute('src', entry.photoUrl);
  img.setAttribute('alt', entry.title);
  const div = document.createElement('div');
  div.classList.add('entry-text');
  const h3 = document.createElement('h3');
  h3.textContent = entry.title;
  const p = document.createElement('p');
  p.textContent = entry.notes;
  div.appendChild(h3);
  div.appendChild(p);
  li.appendChild(img);
  li.appendChild(div);
  return li;
}
const $ul = document.querySelector('.user-entry');
if (!$ul) throw new Error('No user-entry UL');
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const entry = data.entries[i];
    const li = renderEntry(entry);
    $ul.appendChild(li);
  }
  viewSwap(data.view);
  toggleNoEntries();
});
function toggleNoEntries() {
  const $entriesView = document.querySelector('div[data-view="entries"]');
  if (!$entriesView) throw new Error('Entries view not found');
  let $noEntries = document.querySelector('.no-entries');
  if (data.entries.length === 0) {
    if (!$noEntries) {
      $noEntries = document.createElement('p');
      $noEntries.classList.add('no-entries');
      $noEntries.textContent = 'No entries recorded.';
      $entriesView.appendChild($noEntries);
    }
  } else {
    $noEntries?.remove();
  }
}
function viewSwap(viewName) {
  const $entryForm = document.querySelector('div[data-view="entry-form"]');
  const $entries = document.querySelector('div[data-view="entries"]');
  if (!$entries || !$entryForm) throw new Error('View Missing');
  data.view = viewName;
  if (viewName === 'entries') {
    $entries?.classList.remove('hidden');
    $entryForm?.classList.add('hidden');
  } else if (viewName === 'entry-form') {
    $entryForm?.classList.remove('hidden');
    $entries?.classList.add('hidden');
  }
}
const $entriesLink = document.querySelector('.entries-link');
if (!$entriesLink) throw new Error('Entries link not found');
$entriesLink.addEventListener('click', () => {
  viewSwap('entries');
});
const $newLink = document.querySelector('.new-entry-button');
if (!$newLink) throw new Error('New link not found');
$newLink?.addEventListener('click', () => {
  viewSwap('entry-form');
});
