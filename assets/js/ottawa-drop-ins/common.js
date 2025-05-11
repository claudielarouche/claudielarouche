  // wait until the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    const selectAllBtn = document.getElementById('selectAllCategoryButton');
    const unselectAllBtn = document.getElementById('unselectAllCategoryButton');
    const checkboxes = document.querySelectorAll('.ageCheckbox');

    selectAllBtn.addEventListener('click', function() {
      checkboxes.forEach(cb => cb.checked = true);
    });

    unselectAllBtn.addEventListener('click', function() {
      checkboxes.forEach(cb => cb.checked = false);
    });
  });