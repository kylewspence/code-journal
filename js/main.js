'use strict';
// everything else
const $inputUrl = document.querySelector('#photo-url');
const $imgPreview = document.querySelector('.preview-image');
if (!$inputUrl) throw new Error('no input img');
if (!$imgPreview) throw new Error('no preview');
$inputUrl?.addEventListener('input', () => {
  $imgPreview?.setAttribute('src', $inputUrl.value);
});
