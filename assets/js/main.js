"use strict";

// Projects handler
const projectsHandler = {
  projectsData: null,

  projectsGridId: 'projects-grid',
  projectsGridEl: null,
  
  filtersContainerId: 'filters-container',
  filtersContainerEl: null,

  // Classes for highlighting filters
  highlightClasses: ['bg-blue-500', 'text-white'],
  nonHighlightClasses: ['bg-gray-200', 'text-gray-700'],

  init: async function () {
    await this.loadProjectsData();

    // Check if projectsData is available
    if (this.projectsData && this.projectsData.length > 0) {
      this.projectsGridEl = document.getElementById(this.projectsGridId);

      if (this.projectsGridEl) {
        // Initial projects rendering.
        this.renderProjects();
      }

      // Render filters dynamically.
      this.renderFilters();
    } else {
      console.error('No projects data available.');
    }
  },

  loadProjectsData: async function () {
    try {
      const response = await fetch('assets/data/projects.json');
      if (!response.ok) {
        throw new Error('Failed to fetch projects data.');
      }

      this.projectsData = await response.json();
    } catch (error) {
      console.error('Error loading projects data:', error);
    }
  },
  
  renderProjects: function (projectsToRender = null) {
    // Clear existing projects
    this.projectsGridEl.innerHTML = '';

    if ( null === projectsToRender) {
      projectsToRender = this.projectsData;
    }

    // Iterate over projectsData and append project cards to the grid
    projectsToRender.forEach((project, index) => {
      const card = this.createProjectCard(project);
      this.projectsGridEl.appendChild(card);

      // Apply fade-in effect. The timeout on each card will make them appead one after the other.
      setTimeout(() => {
        card.style.opacity = '1';
        card.classList.add('animate-fade-in');
      }, index * 500);
    });
  },

  createProjectCard: function (project) {
    const card = document.createElement('div');
    card.classList.add('bg-white', 'p-6', 'rounded', 'shadow-md');
    
    // Set initial opacity to 0 for fade-in effect
    card.style.opacity = '0';

    // Add project information to the card
    card.innerHTML = `
      <h2 class="text-xl font-bold mb-4 text-gray-600">
        <a href="${project.link}" target="_blank">${project.title}</a>
      </h2>
      <p class="text-gray-700">${project.description}</p>
      <div class="mt-4">
        ${project.tags.map(tag => `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">${tag}</span>`).join('')}
      </div>
      <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <a href="${project.link}" target="_blank">Check it!</a>
      </button>
    `;

    // Set data-tags attribute with transformed tags
    card.setAttribute('data-tags', this._transformTags(project.tags).join(','));

    return card;
  },

  filterProjects: function (selectedTag = '') {
    // Remove highlighting class from all filters
    this.filtersContainerEl.querySelectorAll('[data-tag]').forEach( (filter) => {
      filter.classList.remove(...this.highlightClasses);
      filter.classList.add(...this.nonHighlightClasses);
    });

    // Set selectedTag to "all" if not provided
    selectedTag = selectedTag || 'all';

    // Highlight the selected filter
    const selectedFilter = this.filtersContainerEl.querySelector(`[data-tag="${selectedTag}"]`);
    selectedFilter.classList.remove(...this.nonHighlightClasses);
    selectedFilter.classList.add(...this.highlightClasses);
    
    /**
     * In order to apply filtering we either filter the projects and re-render the cards in the projects grid.
     * or apply a css in order to hide them which should be more performant.
     * I left the first case as a comment just for review.
     *   // Filter projects based on the selected tag
     *   const filteredProjects = selectedTag !== 'all'
     *      ? this.projectsData.filter(project => project.tags.includes(selectedTag))
     *      : this.projectsData;
     *   // Re-render projects grib with filtered project data.
     *   this.renderProjects(filteredProjects);
     */

    // Apply filtering without re-rendering
    this.applyFiltering(selectedTag);
  },

  applyFiltering: function (selectedTag = '') {
    // Iterate over project cards and apply hide/show logic based on the selected tag
    this.projectsGridEl.childNodes.forEach(card => {
      const cardTags = card.getAttribute('data-tags').split(',');

      if (selectedTag === 'all' || cardTags.includes(selectedTag)) {
        // Show the card
        card.style.display = 'block';
      } else {
        // Hide the card
        card.style.display = 'none';
      }
    });
  },

  renderFilters: function () {
    this.filtersContainerEl = document.getElementById(this.filtersContainerId);
  
    if (null === this.filtersContainerEl) { return; }

    // Add default "All" filter
    const allFilter = this.createFilterElement('All');

    // Highlight the "All" filter when first rendered
    allFilter.classList.remove(...this.nonHighlightClasses);
    allFilter.classList.add(...this.highlightClasses);

    this.filtersContainerEl.appendChild(allFilter);
  
    // Add filters based on unique tags from projectsData
    const uniqueTags = Array.from(new Set(this.projectsData.flatMap(project => project.tags)));

    uniqueTags.forEach(tag => {
      const filter = this.createFilterElement(tag);
      this.filtersContainerEl.appendChild(filter);
    });
  },

  createFilterElement: function (tag) {
    const filter = document.createElement('span');
    
    // Convert to lowercase and replace spaces with underscores
    const safeTagName = this._transformTag(tag);

    // Set data-tag attribute
    filter.setAttribute('data-tag', safeTagName);

    filter.classList.add('inline-block', 'rounded-full', 'px-3', 'py-1', 'text-sm', 'font-semibold', 'mr-2', 'cursor-pointer', ...this.nonHighlightClasses);

    // Set tag display text
    filter.innerText = tag;

    filter.addEventListener('click', () => this.filterProjects(safeTagName));
    return filter;
  },

  // Transform tag to lowercase and replace spaces with underscores
  _transformTag: function (tag) {
    return tag.toLowerCase().replace(/\s+/g, '_');
  },

  // Transform tags via _transformTag
  _transformTags: function (tags) {
    return tags.map(tag => this._transformTag(tag));
  },
};

// Call the init method to set up the project handler
projectsHandler.init();