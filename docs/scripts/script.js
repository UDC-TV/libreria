document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {

        filterButtons.forEach(b => b.classList.remove('active'));

      this.classList.add('active');
      
      const filterValue = this.dataset.filter;
      const items = document.querySelectorAll('#documents-list li');
      
      items.forEach(item => {
        if (filterValue === 'all' || 
            item.dataset.type === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
});