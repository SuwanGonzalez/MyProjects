let currentIndex = 0;

function formatOpponentName(opponent) {
    return opponent
        .toLowerCase()
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

function createCarouselFromTable() {
    const carousel = document.querySelector('.carousel');
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    const last5 = rows.slice(0, 5); // last 5 matches

    last5.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const date = cells[0].textContent.trim();      // Get match date
        const opponent = cells[1].textContent.trim();
        const score = cells[2].textContent.trim();
        const formattedName = formatOpponentName(opponent);

        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.style.backgroundImage = `url('images/countries/${formattedName}.jpg')`;
        item.style.display = 'none';

        const overlay = document.createElement('div');
        overlay.className = 'carousel-overlay';

        const dateText = document.createElement('p');
        dateText.textContent = `Date: ${date}`;
        //dateText.classList.add('text-blue'); // Apply a CSS class for blue text

        const opponentText = document.createElement('p');
        opponentText.textContent = `Opponent: ${opponent}`;
        //opponentText.style.color = 'orange'; // Inline style for orange text

        const scoreText = document.createElement('p');
        scoreText.textContent = `Final Score: ${score}`;
        //if (score.includes('Mexico')) {
        //    scoreText.style.color = 'green'; // Green for Mexico wins
        //} else {
        //    scoreText.style.color = 'color: aliceblue'; // Red for losses
        //}

        overlay.appendChild(dateText);
        overlay.appendChild(opponentText);
        overlay.appendChild(scoreText);

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
