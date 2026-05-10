let currentIndex = 0;

function formatMissionName(mission) {
    return mission
        .replace(/U-\d+\s/, "") // Remove prefixes like "U-17" or "U-20"
        .replace(/\s*\(F\)$/, "") // Remove suffix "(F)" for women's games
        .toLowerCase()
        .replace(/\s+/g, '_'); // Replace spaces with hyphens
}

function createCarouselFromTable() {
    const carousel = document.querySelector('.carousel');
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    const last5 = rows.slice(0, 5); // Take first 5 rows from table (latest missions)

    last5.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const date = cells[0].textContent.trim();    // Mission Date
        const mission = cells[1].textContent.trim(); // Mission Name
        const status = cells[2].textContent.trim();  // Status
        const notes = cells[3]?.textContent.trim() || ""; // Notes (optional)
        const formattedName = formatMissionName(mission);

        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.style.backgroundImage = `url('images/spacex/Something_Starlink.jpg')`;
        item.style.display = 'none';

        const overlay = document.createElement('div');
        overlay.className = 'carousel-overlay';

        const dateText = document.createElement('p');
        dateText.textContent = `Date: ${date}`;

        const missionText = document.createElement('p');
        missionText.textContent = `Mission: ${mission}`;

        const statusText = document.createElement('p');
        statusText.textContent = `Status: ${status}`;

        overlay.appendChild(dateText);
        overlay.appendChild(missionText);
        overlay.appendChild(statusText);

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

document.addEventListener('DOMContentLoaded', initializeCarousel);