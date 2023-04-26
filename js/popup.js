document.addEventListener('DOMContentLoaded', function () {
  const pasteImageBox = document.getElementById('pasteImageBox');
  const pastedImageContainer = document.getElementById('pastedImageContainer');

  // Placeholder logic for the pasteImageBox
  pasteImageBox.addEventListener('focus', function () {
    if (pasteImageBox.innerHTML === pasteImageBox.dataset.placeholder) {
      pasteImageBox.innerHTML = '';
      pasteImageBox.style.color = '#000';
    }
  });

  pasteImageBox.addEventListener('blur', function () {
    if (pasteImageBox.innerHTML.trim() === '') {
      pasteImageBox.innerHTML = pasteImageBox.dataset.placeholder;
      pasteImageBox.style.color = '#aaa';
    }
  });

  // Initialize the placeholder
  pasteImageBox.innerHTML = pasteImageBox.dataset.placeholder;
  pasteImageBox.style.color = '#aaa';

  // Listen for the paste event
  window.addEventListener('paste', function (event) {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;

    for (let i = 0; i < items.length; i++) {
      // Check if the item is an image
      if (items[i].type.indexOf('image') !== -1) {
        // Get the image as a blob
        const blob = items[i].getAsFile();
        const reader = new FileReader();

        // Read the image and display it
        reader.onload = function (event) {
          const img = new Image();
          img.src = event.target.result;
          pastedImageContainer.innerHTML = ''; // Clear any previous image
          pastedImageContainer.appendChild(img);
        };

        reader.readAsDataURL(blob);
        break;
      }
    }
  });
});
