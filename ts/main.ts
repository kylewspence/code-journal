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

const $formTitle = document.querySelector('div[data-view="entry-form"] h1');
if (!$formTitle) throw new Error('No Form Title');

// NEW ENTRY

$formElement.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $formElement.elements as FormElements;

  const newEntry: Entry = {
    title: $formElements.title.value,
    photoUrl: $formElements['photo-url'].value,
    notes: $formElements.notes.value,
    entryId: data.editing ? data.editing.entryId : data.nextEntryId,
  };

  if (data.editing) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = newEntry;
      }
    }
    const $oldLi = document.querySelector(
      `li[data-entry-id="${data.editing.entryId}"]`,
    );
    const $newLi = renderEntry(newEntry);

    if ($oldLi) {
      $oldLi.replaceWith($newLi);
    }
  }
  if (!data.editing) {
    data.entries.unshift(newEntry);
    const $li = renderEntry(newEntry);
    $ul?.prepend($li);
    data.nextEntryId++;
  }

  writeData();
  viewSwap('entries');
  toggleNoEntries();
  data.editing = null;
  $formTitle.textContent = 'New Entry';

  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formElement.reset();
});

// RENDER

function renderEntry(entry: Entry): HTMLElement {
  const $li = document.createElement('li');
  $li.classList.add('entry', 'row');
  $li.setAttribute('data-entry-id', entry.entryId.toString());

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('alt', entry.title);
  $img.classList.add('entry-img');

  const $div = document.createElement('div');
  $div.classList.add('entry-text');

  const $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  $h3.classList.add('entry-title');

  const $i = document.createElement('i');
  $i.classList.add('fa-pencil', 'fa-solid');

  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $p.classList.add('entry-notes');

  $div.appendChild($h3);
  $div.appendChild($p);
  $li.appendChild($img);
  $li.appendChild($div);
  $h3.appendChild($i);

  return $li;
}

// DOM LOAD

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

// PENCIL CLICK

$ul.addEventListener('click', (event: Event) => {
  const clicked = event.target as HTMLElement;
  if (!clicked.classList.contains('fa-pencil')) return;

  const $li = clicked.closest('li');
  if (!$li) return;

  const entryId = Number($li.getAttribute('data-entry-id'));

  let entry = null;
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      entry = data.entries[i];
      break;
    }
  }
  if (!entry) return;

  data.editing = entry;

  if (clicked) {
    viewSwap('entry-form');
  }
  const $formElements = $formElement.elements as FormElements;
  ($formElements.title as HTMLInputElement).value = entry.title;
  ($formElement['photo-url'] as HTMLInputElement).value = entry.photoUrl;
  $imgPreview.setAttribute('src', entry.photoUrl);
  ($formElement.notes as HTMLInputElement).value = entry.notes;
});

// TOGGLE

function toggleNoEntries(): void {
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

// VIEWSWAP

function viewSwap(viewName: string): void {
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

  if (!$formTitle) throw new Error('No Form Title');

  if (data.editing) {
    $formTitle.textContent = 'Edit Entry';
  } else {
    $formTitle.textContent = 'New Entry';
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
  data.editing = null;
  viewSwap('entry-form');
  $formElement.reset();
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
});
