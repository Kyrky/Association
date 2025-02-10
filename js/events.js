document.addEventListener('DOMContentLoaded', () => {
  const eventList = document.querySelector('.event-list');
  eventList.innerHTML = '';
  const filePath = '../xlsx/events.xlsx';
  
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
        const eventDate = norm["DATE"] || '';
        const eventTitle = norm["TITLE"] || '';
        const eventDescription = norm["DESCRIPTION"] || '';
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        
        const dateEl = document.createElement('div');
        dateEl.className = 'event-date';
        dateEl.textContent = eventDate;
        
        const titleEl = document.createElement('div');
        titleEl.className = 'event-title';
        titleEl.textContent = eventTitle;
        
        const descriptionEl = document.createElement('div');
        descriptionEl.className = 'event-description';
        descriptionEl.textContent = eventDescription;
        
        eventItem.appendChild(dateEl);
        eventItem.appendChild(titleEl);
        eventItem.appendChild(descriptionEl);
        eventItem.style.animationDelay = Math.random() * 5 + "s";
        eventList.appendChild(eventItem);
      });
    })
    .catch(err => console.error('Error:', err));
});
