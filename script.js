document.addEventListener('DOMContentLoaded', () => {
    const jobListingsContainer = document.querySelector('.job-listings');
    const filtersContainer = document.querySelector('.filters');


    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const allJobs = data;
            let filteredJobs = allJobs;

        
            const renderJobListings = (jobs) => {
                jobListingsContainer.innerHTML = '';
                jobs.forEach(job => {
                    const jobListing = document.createElement('div');
                    jobListing.className = 'job-listing';
                    jobListing.innerHTML = `
                        <div class="header">
                            <img src="${job.logo}" alt="${job.company} logo">
                            <div>
                                <h2>${job.position}</h2>
                                <p><strong>Company:</strong> ${job.company}</p>
                            </div>
                        </div>
                        <p><strong>Location:</strong> ${job.location}</p>
                        <p><strong>Contract:</strong> ${job.contract}</p>
                        <p><strong>Posted:</strong> ${job.postedAt}</p>
                        <div class="tags">
                            ${job.languages.map(lang => `<span>${lang}</span>`).join('')}
                            ${job.tools.map(tool => `<span>${tool}</span>`).join('')}
                        </div>
                    `;
                    jobListingsContainer.appendChild(jobListing);
                });
            };

    
            const renderFilters = () => {
                const roles = [...new Set(allJobs.map(job => job.role))];
                const levels = [...new Set(allJobs.map(job => job.level))];
                const categories = roles.concat(levels);

                categories.forEach(category => {
                    const button = document.createElement('button');
                    button.textContent = category;
                    button.addEventListener('click', () => {
                        filteredJobs = allJobs.filter(job => job.role === category || job.level === category);
                        renderJobListings(filteredJobs);
                    });
                    filtersContainer.appendChild(button);
                });
            };

            renderFilters();
            renderJobListings(allJobs);
        });
});
