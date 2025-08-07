function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');

  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => {
        if (response.ok) return response.text();
        throw new Error('Page not found: ' + file);
      })
      .then(data => el.innerHTML = data)
      .catch(error => console.error(error));
  });
}

window.addEventListener('DOMContentLoaded', includeHTML);
