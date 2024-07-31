// Префиксный поиск по названиям городов
function filterTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const table = document.querySelector('.table-scrollable');
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const city = row.querySelector('td:last-child').textContent.toLowerCase();
        // Проверка, начинается ли название города с введенного префикса
        if (city.startsWith(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    filterTable();
}
