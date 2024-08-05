const entries = [
    {
        title: "Anxiety Disorders",
        link: "https://en.wikipedia.org/wiki/Anxiety_disorder",
        description: "Anxiety disorders are a group of mental health disorders characterized by feelings of anxiety and fear. They can range from generalized anxiety disorder (GAD) to specific phobias."
    },
    {
        title: "Bipolar Disorder",
        link: "https://en.wikipedia.org/wiki/Bipolar_disorder",
        description: "Bipolar disorder, also known as manic-depressive illness, is marked by extreme mood swings, including episodes of mania (elevated mood) and depression (low mood)."
    },
    {
        title: "Clinical Depression",
        link: "https://en.wikipedia.org/wiki/Major_depressive_disorder",
        description: "Clinical depression, or major depressive disorder, is a common mental health disorder characterized by persistent feelings of sadness, hopelessness, and a loss of interest or pleasure in activities."
    },
    {
        title: "Dissociative Identity Disorder (DID)",
        link: "https://en.wikipedia.org/wiki/Dissociative_identity_disorder",
        description: "DID, formerly known as multiple personality disorder, is a condition in which an individual's identity is fragmented into two or more distinct personality states."
    },
    {
        title: "Obsessive-Compulsive Disorder (OCD)",
        link: "https://en.wikipedia.org/wiki/Obsessive%E2%80%93compulsive_disorder",
        description: "OCD is characterized by persistent, intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) performed to alleviate the distress caused by these obsessions."
    },
    {
        title: "Post-Traumatic Stress Disorder (PTSD)",
        link: "https://en.wikipedia.org/wiki/Post-traumatic_stress_disorder",
        description: "PTSD is a mental health condition triggered by experiencing or witnessing a traumatic event. Symptoms include flashbacks, nightmares, and severe anxiety."
    },
    {
        title: "Schizophrenia",
        link: "https://en.wikipedia.org/wiki/Schizophrenia",
        description: "Schizophrenia is a severe mental disorder characterized by delusions, hallucinations, and impaired functioning. It affects how a person thinks, feels, and behaves."
    },
    {
        title: "Social Anxiety Disorder",
        link: "https://en.wikipedia.org/wiki/Social_anxiety_disorder",
        description: "Social anxiety disorder involves intense fear or anxiety in social situations, often leading to avoidance of social interactions and a significant impact on daily life."
    }
];

const itemsPerPage = 5;
let currentPage = 1;

function renderEntries(entriesToShow) {
    const entryList = document.getElementById('entryList');
    entryList.innerHTML = '';
    entriesToShow.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <h2><a href="${entry.link}" target="_blank">${entry.title}</a></h2>
            <p class="description">${entry.description}</p>
        `;
        entryList.appendChild(entryDiv);
    });
}

function setupPagination(totalEntries) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const numPages = Math.ceil(totalEntries / itemsPerPage);

    for (let i = 1; i <= numPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = function() {
            currentPage = i;
            showPage(currentPage);
        };
        if (i === currentPage) {
            button.style.backgroundColor = 'darkcyan';
        }
        pagination.appendChild(button);
    }
}

function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const paginatedEntries = entries.slice(start, end);

    renderEntries(paginatedEntries);
    setupPagination(entries.length);
}

function searchEntries() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredEntries = entries.filter(entry =>
        entry.title.toLowerCase().includes(searchTerm) || 
        entry.description.toLowerCase().includes(searchTerm)
    );

    if (filteredEntries.length > 0) {
        document.getElementById('noResults').style.display = 'none';
        renderEntries(filteredEntries.slice(0, itemsPerPage));
        setupPagination(filteredEntries.length);
    } else {
        document.getElementById('noResults').style.display = 'block';
        document.getElementById('entryList').innerHTML = '';
        document.getElementById('pagination').innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showPage(currentPage);
});
