/**
 * Menu Search Functionality
 * Filters menu items based on search query
 */

class MenuSearch {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.clearSearchBtn = document.getElementById('clearSearchBtn');
    this.searchResultsInfo = document.getElementById('searchResultsInfo');
    this.menuSections = document.querySelectorAll('.menu-section');
    this.allMenuItems = document.querySelectorAll('.menu-item');
    
    this.initializeEventListeners();
  }

  /**
   * Initialize search event listeners
   */
  initializeEventListeners() {
    // Search input event
    this.searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (query) {
        this.clearSearchBtn.style.display = 'block';
        this.performSearch(query);
      } else {
        this.clearSearchBtn.style.display = 'none';
        this.resetSearch();
      }
    });

    // Clear button event
    this.clearSearchBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.clearSearchBtn.style.display = 'none';
      this.resetSearch();
      this.searchInput.focus();
    });
  }

  /**
   * Perform search and filter items
   */
  performSearch(query) {
    let visibleCount = 0;

    // First, hide all items and sections
    this.allMenuItems.forEach(item => {
      item.classList.add('hidden');
    });

    // Filter items based on search query
    this.allMenuItems.forEach(item => {
      const itemName = item.dataset.itemName.toLowerCase();
      const itemDescription = item.querySelector('.menu-item-description')?.textContent.toLowerCase() || '';

      // Check if item matches search query
      if (itemName.includes(query) || itemDescription.includes(query)) {
        item.classList.remove('hidden');
        visibleCount++;
      }
    });

    // Update section visibility
    this.updateSectionVisibility();

    // Show/hide search results info
    if (visibleCount > 0) {
      this.searchResultsInfo.style.display = 'block';
      document.getElementById('resultCount').textContent = visibleCount;
      this.removeNoResultsMessage();
    } else {
      this.showNoResults();
      this.searchResultsInfo.style.display = 'none';
    }
  }

  /**
   * Update section visibility based on item visibility
   */
  updateSectionVisibility() {
    this.menuSections.forEach(section => {
      const visibleItems = section.querySelectorAll('.menu-item:not(.hidden)');
      
      if (visibleItems.length === 0) {
        section.classList.add('all-hidden');
      } else {
        section.classList.remove('all-hidden');
      }
    });
  }

  /**
   * Show no results message
   */
  showNoResults() {
    // Remove existing no results message if any
    this.removeNoResultsMessage();

    const noResultsDiv = document.createElement('div');
    noResultsDiv.className = 'no-results';
    noResultsDiv.id = 'noResultsMessage';
    noResultsDiv.innerHTML = `
      <i class="fas fa-search"></i>
      <h3>No items found</h3>
      <p>Sorry, we couldn't find any items matching your search.</p>
      <button class="no-results-btn" onclick="document.getElementById('searchInput').value = ''; document.getElementById('clearSearchBtn').click();">
        Clear Search
      </button>
    `;

    // Insert after the search section
    const menuContainer = document.querySelector('.menu-container');
    const searchSection = document.querySelector('.search-section');
    menuContainer.insertBefore(noResultsDiv, searchSection.nextSibling);
  }

  /**
   * Remove no results message
   */
  removeNoResultsMessage() {
    const noResultsMsg = document.getElementById('noResultsMessage');
    if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  /**
   * Reset search and show all items
   */
  resetSearch() {
    this.allMenuItems.forEach(item => {
      item.classList.remove('hidden');
    });

    this.menuSections.forEach(section => {
      section.classList.remove('all-hidden');
    });

    this.searchResultsInfo.style.display = 'none';
    this.removeNoResultsMessage();
  }
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', () => {
  new MenuSearch();
});
