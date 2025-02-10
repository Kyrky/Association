document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.contacts-container');
  container.innerHTML = '';
  const filePath = '../xlsx/contacts.xlsx';
  
  fetch(filePath)
    .then(resp => {
      if (!resp.ok) throw new Error('File load error: ' + resp.statusText);
      return resp.arrayBuffer();
    })
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      
      jsonData.forEach(item => {
        const norm = {};
        Object.keys(item).forEach(key => {
          norm[key.trim().toUpperCase()] = item[key];
        });
        

        const card = document.createElement('div');
        card.className = 'contact-card';
        
        const nameEl = document.createElement('h3');
        nameEl.textContent = norm["ПІБ"] || 'Без імені';
        card.appendChild(nameEl);
        
        const phoneEl = document.createElement('p');
        phoneEl.innerHTML = '<span class="contact-label">Телефон:</span>' + (norm["ТЕЛЕФОН"] || '');
        card.appendChild(phoneEl);
        
        const emailEl = document.createElement('p');
        emailEl.innerHTML = '<span class="contact-label">Пошта:</span>' + (norm["ПОШТА"] || '');
        card.appendChild(emailEl);
   
        let telegram = norm["ТЕЛЕГРАМ"];
        if (!telegram && norm["СОЦІАЛЬНІ МЕРЕЖІ"]) {
          const matches = norm["СОЦІАЛЬНІ МЕРЕЖІ"].match(/Telegram\s*[:|-]?\s*(\S+)/i);
          telegram = matches ? matches[1] : '';
        }
        if (telegram && telegram[0] !== '@') {
          telegram = '@' + telegram;
        }
        const telegramEl = document.createElement('p');
        telegramEl.innerHTML = '<span class="contact-label">Telegram:</span>' + (telegram || 'N/A');
        telegramEl.classList.add('contact-telegram');
        card.appendChild(telegramEl);
        
        const cityEl = document.createElement('p');
        cityEl.innerHTML = '<span class="contact-label">Місто:</span>' + (norm["МІСТО"] || '');
        cityEl.classList.add('contact-city');
        card.appendChild(cityEl);
        
        container.appendChild(card);
      });
    })
    .catch(err => console.error('Error:', err));
});

function filterContacts() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.contact-card');
  cards.forEach(card => {
    const cityText = card.querySelector('.contact-city').textContent.toLowerCase();
    card.style.display = cityText.includes(input) ? '' : 'none';
  });
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  filterContacts();
}
