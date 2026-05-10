let currentIndex = 0;

function formatOverworldName(overworld) {
    return overworld
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') 
        .replace(/\s+/g, '_');       
        
}

function createCarouselFromTable() {
    const carousel = document.querySelector('.carousel');
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    const last5 = rows.slice(0, 5); // Take first 5 rows from table (latest runs)

    last5.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const date = cells[0].textContent.trim();    // Run Date
        const run = cells[1].textContent.trim(); // Run Name
        const overworld = cells[2].textContent.trim();  // Status
        const bastion = cells[3]?.textContent.trim() || ""; // Notes (optional)
        const formattedName = formatOverworldName(overworld);

        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.style.backgroundImage = `url('images/mcsr/${formattedName}.png')`;
        item.style.display = 'none';

        const overlay = document.createElement('div');
        overlay.className = 'carousel-overlay';

        const dateText = document.createElement('p');
        dateText.textContent = `Date: ${date}`;

        const runText = document.createElement('p');
        runText.textContent = `Run: ${run}`;

        const bastionText = document.createElement('p');
        bastionText.textContent = `Bastion: ${bastion}`;

        overlay.appendChild(dateText);
        overlay.appendChild(runText);
        overlay.appendChild(bastionText);

        item.appendChild(overlay);
        carousel.appendChild(item);
    });
}

function showNextItem() {
    const items = document.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    items[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].style.display = 'block';
}

function initializeCarousel() {
    createCarouselFromTable();
    const items = document.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    items[0].style.display = 'block';
    setInterval(showNextItem, 3000);
}
