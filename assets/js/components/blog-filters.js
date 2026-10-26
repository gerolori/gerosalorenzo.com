(function() {
  'use strict';
  
  let selectedCategories = new Set();
  let selectedTags = new Set();
  let currentSort = 'newest';
  let currentLimit = 10;
  
  // Toggle custom dropdown
  function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const allDropdowns = document.querySelectorAll('.custom-dropdown, .chip-dropdown');
    const allTriggers = document.querySelectorAll('.filter-chip, .dropdown-trigger');
    
    // Close all other dropdowns
    allDropdowns.forEach(d => {
      if (d.id !== dropdownId && !d.closest(`#${dropdownId}`)) {
        d.classList.remove('open');
      }
    });
    
    // Remove open state from all triggers
    allTriggers.forEach(t => {
      if (!t.closest(`#${dropdownId}`)) {
        t.classList.remove('open');
      }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('open');
  }
  
  // Initialize custom dropdown triggers (excludes popup dropdowns which have their own handler)
  function initCustomDropdowns() {
    document.querySelectorAll('.custom-dropdown:not(#date-popup .custom-dropdown) .dropdown-trigger').forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.closest('.custom-dropdown');
        toggleDropdown(dropdown.id);
      });
    });
    
    // Handle option selection (single-select dropdowns only - exclude checkbox options)
    document.querySelectorAll('.custom-dropdown .dropdown-option:not(.dropdown-option-checkbox)').forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.closest('.custom-dropdown');
        const value = this.dataset.value;
        const label = this.textContent;
        
        // Update display
        dropdown.querySelector('.dropdown-label').textContent = label;
        dropdown.dataset.value = value;
        
        // Mark selected
        dropdown.querySelectorAll('.dropdown-option').forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
        
        // Toggle active state for date dropdowns
        if (value) {
          dropdown.classList.add('active');
        } else {
          dropdown.classList.remove('active');
        }
        
        // Close dropdown
        dropdown.classList.remove('open');
        
        // Trigger appropriate action based on dropdown type
        if (dropdown.id === 'sort-dropdown') {
          currentSort = value;
          applySorting();
        } else if (dropdown.id === 'limit-dropdown') {
          currentLimit = value === 'all' ? Infinity : parseInt(value);
          applyPagination();
        } else if (dropdown.id.includes('year') || dropdown.id.includes('month')) {
          // Mobile date dropdowns: apply immediately
          if (!dropdown.id.startsWith('popup-')) {
            applyFilters();
            updateFilterToggleBtn();
            updateDatePopupLabel();
          }
        }
      });
    });
  }
  
  // Multi-select dropdown toggle
  function toggleMultiselectDropdown(triggerId, dropdownId) {
    const trigger = document.getElementById(triggerId);
    const dropdown = document.getElementById(dropdownId);
    const allDropdowns = document.querySelectorAll('.chip-dropdown, .custom-dropdown');
    const allTriggers = document.querySelectorAll('.filter-chip, .dropdown-trigger');
    
    // Close all other dropdowns
    allDropdowns.forEach(d => {
      if (d.id !== dropdownId) {
        d.classList.remove('open');
      }
    });
    
    // Remove open state from all triggers
    allTriggers.forEach(t => {
      if (t.id !== triggerId) {
        t.classList.remove('open');
      }
    });
    
    // Toggle current dropdown
    const isOpen = dropdown.classList.contains('open');
    if (isOpen) {
      dropdown.classList.remove('open');
      trigger.classList.remove('open');
    } else {
      dropdown.classList.add('open');
      trigger.classList.add('open');
    }
  }
  
// Handle multiselect checkbox changes
  function handleMultiselectChange() {
    selectedCategories.clear();
    selectedTags.clear();

    document.querySelectorAll('#category-dropdown input[type="checkbox"]:checked').forEach(checkbox => {
      selectedCategories.add(checkbox.value);
    });

    document.querySelectorAll('#tag-dropdown input[type="checkbox"]:checked').forEach(checkbox => {
      selectedTags.add(checkbox.value);
    });

    updateMultiselectLabels();
    updateFilterToggleBtn();
    applyFilters();
  }
  
  // Update multiselect button labels and styles
  function updateMultiselectLabels() {
    const categoryLabel = document.getElementById('category-label');
    const categoryTrigger = document.getElementById('category-trigger');
    const tagLabel = document.getElementById('tag-label');
    const tagTrigger = document.getElementById('tag-trigger');
    
    if (categoryLabel && categoryTrigger) {
      if (selectedCategories.size === 0) {
        categoryLabel.textContent = 'Category';
        categoryTrigger.classList.remove('active');
      } else if (selectedCategories.size === 1) {
        const value = Array.from(selectedCategories)[0];
        categoryLabel.textContent = humanize(value);
        categoryTrigger.classList.add('active');
      } else {
        categoryLabel.textContent = `${selectedCategories.size} Categories`;
        categoryTrigger.classList.add('active');
      }
    }
    
    if (tagLabel && tagTrigger) {
      if (selectedTags.size === 0) {
        tagLabel.textContent = 'Tag';
        tagTrigger.classList.remove('active');
      } else if (selectedTags.size === 1) {
        const value = Array.from(selectedTags)[0];
        tagLabel.textContent = humanize(value);
        tagTrigger.classList.add('active');
      } else {
        tagLabel.textContent = `${selectedTags.size} Tags`;
        tagTrigger.classList.add('active');
      }
    }
    
    updateClearAllButton();
  }
  
  // Humanize string (capitalize first letter of each word)
  function humanize(str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // Check if any filters are active
  function hasActiveFilters() {
    const fromYearDropdown = document.getElementById('from-year-dropdown');
    const fromMonthDropdown = document.getElementById('from-month-dropdown');
    const toYearDropdown = document.getElementById('to-year-dropdown');
    const toMonthDropdown = document.getElementById('to-month-dropdown');

    const fromYear = fromYearDropdown?.dataset.value || '';
    const fromMonth = fromMonthDropdown?.dataset.value || '';
    const toYear = toYearDropdown?.dataset.value || '';
    const toMonth = toMonthDropdown?.dataset.value || '';

    return selectedCategories.size > 0 ||
           selectedTags.size > 0 ||
           fromYear || fromMonth || toYear || toMonth;
  }

  // Update filter toggle button state - icon-only mode
  function updateFilterToggleBtn() {
    const toggleBtn = document.getElementById('filter-toggle-btn');

    if (!toggleBtn) return;

    if (hasActiveFilters()) {
      toggleBtn.classList.add('has-filters');
    } else {
      toggleBtn.classList.remove('has-filters');
    }
  }

  // Update Clear All button state
  function updateClearAllButton() {
    updateFilterToggleBtn();
  }
  
  // Clear all filters
  function clearAllFilters() {
    selectedCategories.clear();
    selectedTags.clear();

    document.querySelectorAll('.custom-dropdown input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });

    // Reset date dropdowns
    resetDropdown('from-year-dropdown', 'Year');
    resetDropdown('from-month-dropdown', 'Month');
    resetDropdown('to-year-dropdown', 'Year');
    resetDropdown('to-month-dropdown', 'Month');

    // Reset popup dropdowns
    resetDropdown('popup-from-year-dropdown', 'Year');
    resetDropdown('popup-from-month-dropdown', 'Month');
    resetDropdown('popup-to-year-dropdown', 'Year');
    resetDropdown('popup-to-month-dropdown', 'Month');

    // Reset date popup label
    updateDatePopupLabel();

    // Close filter panel
    document.getElementById('filter-panel')?.classList.remove('open');

    updateMultiselectLabels();
    updateFilterToggleBtn();
    applyFilters();
  }

  // Reset a dropdown to its default state
  function resetDropdown(dropdownId, defaultLabel) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    
    dropdown.dataset.value = '';
    dropdown.querySelector('.dropdown-label').textContent = defaultLabel;
    dropdown.classList.remove('active');
    dropdown.querySelectorAll('.dropdown-option').forEach(o => o.classList.remove('selected'));
    // Mark the "Any" or first empty option as selected if it exists
    const emptyOption = dropdown.querySelector('.dropdown-option[data-value=""]');
    if (emptyOption) {
      emptyOption.classList.add('selected');
    }
  }

  // Show error toast for date validation
  function showErrorToast(message) {
    const existing = document.getElementById('date-error-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.id = 'date-error-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary);
      color: var(--theme);
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 2000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      font-size: 14px;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
  }
  
  // Apply filters
  function applyFilters() {
    const posts = document.querySelectorAll('.filterable-post');
    const fromYearDropdown = document.getElementById('from-year-dropdown');
    const fromMonthDropdown = document.getElementById('from-month-dropdown');
    const toYearDropdown = document.getElementById('to-year-dropdown');
    const toMonthDropdown = document.getElementById('to-month-dropdown');
    
    const fromYear = fromYearDropdown?.dataset.value || '';
    const fromMonth = fromMonthDropdown?.dataset.value || '';
    const toYear = toYearDropdown?.dataset.value || '';
    const toMonth = toMonthDropdown?.dataset.value || '';
    
    let fromDate = null;
    let toDate = null;
    
    if (fromYear) {
      const month = fromMonth || '01';
      fromDate = new Date(`${fromYear}-${month}-01`);
    }
    
    if (toYear) {
      const month = toMonth || '12';
      const lastDay = new Date(parseInt(toYear), parseInt(month), 0).getDate();
      toDate = new Date(`${toYear}-${month}-${lastDay}`);
    }
    
    let visibleCount = 0;
    
    posts.forEach(post => {
      const categories = post.dataset.categories.split(',').filter(c => c);
      const tags = post.dataset.tags.split(',').filter(t => t);
      const postDate = new Date(post.dataset.date);
      
      let matchesCategory = selectedCategories.size === 0 || 
        categories.some(cat => selectedCategories.has(cat));
      
      let matchesTag = selectedTags.size === 0 || 
        tags.some(tag => selectedTags.has(tag));
      
      let matchesDate = true;
      if (fromDate && postDate < fromDate) {
        matchesDate = false;
      }
      if (toDate && postDate > toDate) {
        matchesDate = false;
      }
      
      if (matchesCategory && matchesTag && matchesDate) {
        post.classList.remove('hidden');
        post.classList.remove('pagination-hidden');
        visibleCount++;
      } else {
        post.classList.add('hidden');
        post.classList.remove('pagination-hidden');
      }
    });
    
    updateClearAllButton();
    applySorting();
    applyPagination();
    
    const noResults = document.getElementById('no-results');
    const pagination = document.getElementById('pagination-wrapper');
    
    if (visibleCount === 0) {
      noResults.style.display = 'block';
      if (pagination) pagination.style.display = 'none';
    } else {
      noResults.style.display = 'none';
      if (pagination) pagination.style.display = 'block';
    }
  }
  
  // Apply sorting
  function applySorting() {
    const sortValue = document.getElementById('sort-dropdown').dataset.value;
    currentSort = sortValue;
    
    const postList = document.getElementById('post-list');
    const posts = Array.from(document.querySelectorAll('.filterable-post'));
    const noResults = document.getElementById('no-results');
    const pagination = document.getElementById('pagination-wrapper');
    
    posts.sort((a, b) => {
      if (sortValue === 'newest') {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      } else if (sortValue === 'oldest') {
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      } else if (sortValue === 'title-asc') {
        return a.dataset.title.localeCompare(b.dataset.title);
      } else if (sortValue === 'title-desc') {
        return b.dataset.title.localeCompare(a.dataset.title);
      }
      return 0;
    });
    
    posts.forEach(post => {
      postList.insertBefore(post, noResults);
    });
  }
  
  // Apply pagination limit
  function applyPagination() {
    const limitValue = document.getElementById('limit-dropdown').dataset.value;
    currentLimit = limitValue === 'all' ? Infinity : parseInt(limitValue);

    const posts = document.querySelectorAll('.filterable-post');
    let visibleCount = 0;
    let displayedCount = 0;

    posts.forEach(post => {
      // Count posts that passed filters (not hidden by filters)
      if (!post.classList.contains('hidden')) {
        visibleCount++;

        // Apply pagination limit
        if (displayedCount < currentLimit) {
          post.classList.remove('pagination-hidden');
          displayedCount++;
        } else {
          post.classList.add('pagination-hidden');
        }
      }
    });

    const noResults = document.getElementById('no-results');
    const pagination = document.getElementById('pagination-wrapper');

    if (displayedCount === 0) {
      noResults.style.display = 'block';
      if (pagination) pagination.style.display = 'none';
    } else {
      noResults.style.display = 'none';
      if (pagination) pagination.style.display = 'block';
    }
  }
  
  // Update date popup trigger label (desktop)
  // Format: MM/YYYY - e.g., "From 01/2026", "To 01/2026", "01/2026 - 03/2026"
  function updateDatePopupLabel() {
    const label = document.getElementById('date-popup-label');
    const fromYear = document.getElementById('from-year-dropdown')?.dataset.value;
    const toYear = document.getElementById('to-year-dropdown')?.dataset.value;
    const fromMonth = document.getElementById('from-month-dropdown')?.dataset.value;
    const toMonth = document.getElementById('to-month-dropdown')?.dataset.value;
    const trigger = document.getElementById('date-popup-trigger');

    if (!label || !trigger) return;

    if (fromYear || toYear) {
      if (fromYear && toYear) {
        const fromStr = fromMonth ? `${fromMonth}/${fromYear}` : `01/${fromYear}`;
        const toStr = toMonth ? `${toMonth}/${toYear}` : `12/${toYear}`;
        label.textContent = `${fromStr} - ${toStr}`;
      } else if (fromYear) {
        const fromStr = fromMonth ? `${fromMonth}/${fromYear}` : `01/${fromYear}`;
        label.textContent = `From ${fromStr}`;
      } else {
        const toStr = toMonth ? `${toMonth}/${toYear}` : `12/${toYear}`;
        label.textContent = `To ${toStr}`;
      }
      trigger.classList.add('has-date');
      trigger.classList.add('active');
    } else {
      label.textContent = '';
      trigger.classList.remove('has-date');
      trigger.classList.remove('active');
    }
  }
  
  // Populate year dropdowns
  function populateYearDropdowns() {
    const fromYearDropdown = document.getElementById('from-year-dropdown');
    const toYearDropdown = document.getElementById('to-year-dropdown');
    
    // Return early if mobile date dropdowns don't exist (popup-only mode)
    if (!fromYearDropdown || !toYearDropdown) return;
    
    const posts = document.querySelectorAll('.filterable-post');
    const years = new Set();
    
    posts.forEach(post => {
      const year = post.dataset.date.split('-')[0];
      years.add(year);
    });
    
    const sortedYears = Array.from(years).sort((a, b) => b - a);
    
    const fromYearOptions = fromYearDropdown.querySelector('.dropdown-options');
    const toYearOptions = toYearDropdown.querySelector('.dropdown-options');
    
    // Guard clause: skip if no options containers (hidden storage dropdowns)
    if (!fromYearOptions || !toYearOptions) return;
    
    // Add "Any" option
    const fromAnyOption = document.createElement('div');
    fromAnyOption.className = 'dropdown-option';
    fromAnyOption.dataset.value = '';
    fromAnyOption.textContent = 'Any';
    fromYearOptions.appendChild(fromAnyOption);
    
    const toAnyOption = document.createElement('div');
    toAnyOption.className = 'dropdown-option';
    toAnyOption.dataset.value = '';
    toAnyOption.textContent = 'Any';
    toYearOptions.appendChild(toAnyOption);
    
    sortedYears.forEach(year => {
      const option1 = document.createElement('div');
      option1.className = 'dropdown-option';
      option1.dataset.value = year;
      option1.textContent = year;
      fromYearOptions.appendChild(option1);
      
      const option2 = document.createElement('div');
      option2.className = 'dropdown-option';
      option2.dataset.value = year;
      option2.textContent = year;
      toYearOptions.appendChild(option2);
    });
  }
  
  // Populate popup year dropdowns (desktop)
  function populatePopupYearDropdowns() {
    const posts = document.querySelectorAll('.filterable-post');
    const years = new Set();
    
    posts.forEach(post => {
      const year = post.dataset.date.split('-')[0];
      years.add(year);
    });
    
    const sortedYears = Array.from(years).sort((a, b) => b - a);
    
    const popupFromYearDropdown = document.getElementById('popup-from-year-dropdown');
    const popupToYearDropdown = document.getElementById('popup-to-year-dropdown');
    
    if (!popupFromYearDropdown || !popupToYearDropdown) return;
    
    const fromYearOptions = popupFromYearDropdown.querySelector('.dropdown-options');
    const toYearOptions = popupToYearDropdown.querySelector('.dropdown-options');
    
    // Guard clause: skip if no options containers
    if (!fromYearOptions || !toYearOptions) return;
    
    // Add "Any" option
    const fromAnyOption = document.createElement('div');
    fromAnyOption.className = 'dropdown-option';
    fromAnyOption.dataset.value = '';
    fromAnyOption.textContent = 'Any';
    fromYearOptions.appendChild(fromAnyOption);
    
    const toAnyOption = document.createElement('div');
    toAnyOption.className = 'dropdown-option';
    toAnyOption.dataset.value = '';
    toAnyOption.textContent = 'Any';
    toYearOptions.appendChild(toAnyOption);
    
    sortedYears.forEach(year => {
      const option1 = document.createElement('div');
      option1.className = 'dropdown-option';
      option1.dataset.value = year;
      option1.textContent = year;
      fromYearOptions.appendChild(option1);
      
      const option2 = document.createElement('div');
      option2.className = 'dropdown-option';
      option2.dataset.value = year;
      option2.textContent = year;
      toYearOptions.appendChild(option2);
    });
  }
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.filter-chip-wrapper') && !event.target.closest('.custom-dropdown')) {
      document.querySelectorAll('.chip-dropdown').forEach(dropdown => {
        dropdown.classList.remove('open');
      });
      document.querySelectorAll('.filter-chip').forEach(trigger => {
        trigger.classList.remove('open');
      });
      document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        dropdown.classList.remove('open');
      });
    }
  });
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    populateYearDropdowns();
    initCustomDropdowns();

    // Apply initial pagination and update buttons
    applyPagination();
    updateFilterToggleBtn();

    // Filter toggle button handler
    const filterToggleBtn = document.getElementById('filter-toggle-btn');
    const filterPanel = document.getElementById('filter-panel');

    filterToggleBtn?.addEventListener('click', function() {
      if (hasActiveFilters()) {
        // Clear mode - clear filters and close panel
        clearAllFilters();
        filterPanel?.classList.remove('open');
      } else {
        // Toggle mode - open/close panel
        filterPanel?.classList.toggle('open');
      }
    });

    // Date popup handlers (desktop)
    const datePopupTrigger = document.getElementById('date-popup-trigger');
    const datePopup = document.getElementById('date-popup');
    const datePopupOverlay = document.getElementById('date-popup-overlay');
    const datePopupClose = document.getElementById('date-popup-close');
    const dateClearBtn = document.getElementById('date-clear-btn');

    function openDatePopup() {
      datePopup?.classList.add('open');
      datePopupOverlay?.classList.add('open');

      // Sync popup dropdowns with mobile dropdowns
      syncDateDropdownsToPopup();
    }

    function closeDatePopup() {
      datePopup?.classList.remove('open');
      datePopupOverlay?.classList.remove('open');
    }

    function syncDateDropdownsToPopup() {
      // Copy values from mobile dropdowns to popup dropdowns
      const fromYearDropdown = document.getElementById('from-year-dropdown');
      const fromMonthDropdown = document.getElementById('from-month-dropdown');
      const toYearDropdown = document.getElementById('to-year-dropdown');
      const toMonthDropdown = document.getElementById('to-month-dropdown');

      const mobileFromYear = fromYearDropdown?.dataset.value || '';
      const mobileFromMonth = fromMonthDropdown?.dataset.value || '';
      const mobileToYear = toYearDropdown?.dataset.value || '';
      const mobileToMonth = toMonthDropdown?.dataset.value || '';

      syncDropdownValue('popup-from-year-dropdown', mobileFromYear);
      syncDropdownValue('popup-from-month-dropdown', mobileFromMonth);
      syncDropdownValue('popup-to-year-dropdown', mobileToYear);
      syncDropdownValue('popup-to-month-dropdown', mobileToMonth);
    }

    function syncDropdownValue(dropdownId, value) {
      const dropdown = document.getElementById(dropdownId);
      if (!dropdown) return;

      dropdown.dataset.value = value;
      const selectedOption = dropdown.querySelector(`.dropdown-option[data-value="${value}"]`);
      if (selectedOption) {
        dropdown.querySelector('.dropdown-label').textContent = selectedOption.textContent;
        dropdown.querySelectorAll('.dropdown-option').forEach(o => o.classList.remove('selected'));
        selectedOption.classList.add('selected');
        dropdown.classList.toggle('active', !!value);
      } else if (!value) {
        dropdown.querySelector('.dropdown-label').textContent = dropdownId.includes('year') ? 'Year' : 'Month';
        dropdown.classList.remove('active');
      }
    }

    // Auto-apply date popup changes (no Apply button needed)
    function autoApplyDatePopup() {
      const popupFromYear = document.getElementById('popup-from-year-dropdown')?.dataset.value || '';
      const popupFromMonth = document.getElementById('popup-from-month-dropdown')?.dataset.value || '';
      const popupToYear = document.getElementById('popup-to-year-dropdown')?.dataset.value || '';
      const popupToMonth = document.getElementById('popup-to-month-dropdown')?.dataset.value || '';

      // Coherence check: From date must be <= To date
      if (popupFromYear && popupToYear) {
        const fromMonth = popupFromMonth || '01';
        const toMonth = popupToMonth || '12';
        const fromDate = new Date(parseInt(popupFromYear), parseInt(fromMonth) - 1, 1);
        const toDate = new Date(parseInt(popupToYear), parseInt(toMonth) - 1, 1);
        
        if (fromDate > toDate) {
          showErrorToast('From date cannot be later than To date');
          return;
        }
      }

      // Sync all popup values to storage dropdowns
      syncDropdownValue('from-year-dropdown', popupFromYear);
      syncDropdownValue('from-month-dropdown', popupFromMonth);
      syncDropdownValue('to-year-dropdown', popupToYear);
      syncDropdownValue('to-month-dropdown', popupToMonth);
      
      // Then apply filters
      applyFilters();
      updateDatePopupLabel();
      updateFilterToggleBtn();
    }

    function clearDatePopup() {
      syncDropdownValue('popup-from-year-dropdown', '');
      syncDropdownValue('popup-from-month-dropdown', '');
      syncDropdownValue('popup-to-year-dropdown', '');
      syncDropdownValue('popup-to-month-dropdown', '');
      // Auto-apply after clearing
      autoApplyDatePopup();
      closeDatePopup();
    }

    // Initialize popup dropdown listeners (called after dynamic options are added)
    function initPopupDropdownListeners() {
      const popupDropdowns = document.querySelectorAll('#date-popup .custom-dropdown');
      popupDropdowns.forEach(dropdown => {
        dropdown.querySelector('.dropdown-trigger')?.addEventListener('click', function(e) {
          e.stopPropagation();
          // Close other popup dropdowns
          popupDropdowns.forEach(d => {
            if (d !== dropdown) d.classList.remove('open');
          });
          dropdown.classList.toggle('open');
        });

        // Add click handlers to all options (including dynamically added)
        dropdown.querySelectorAll('.dropdown-option').forEach(option => {
          option.addEventListener('click', function(e) {
            e.stopPropagation();
            const value = this.dataset.value;
            const label = this.textContent;

            dropdown.querySelector('.dropdown-label').textContent = label;
            dropdown.dataset.value = value;
            dropdown.querySelectorAll('.dropdown-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            dropdown.classList.toggle('active', !!value);
            dropdown.classList.remove('open');

            // Auto-apply when popup dropdown changes
            autoApplyDatePopup();
          });
        });
      });
    }

    datePopupTrigger?.addEventListener('click', openDatePopup);
    datePopupClose?.addEventListener('click', closeDatePopup);
    datePopupOverlay?.addEventListener('click', closeDatePopup);
    dateClearBtn?.addEventListener('click', clearDatePopup);

    // Initialize popup year dropdowns and their listeners
    populatePopupYearDropdowns();
    initPopupDropdownListeners();
  });
  
})();
