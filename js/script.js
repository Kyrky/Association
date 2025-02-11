
document.addEventListener('DOMContentLoaded', () => {
  const shopContent = document.getElementById('shop-content');
  if (shopContent) {
    shopContent.style.display = 'none';

    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-seminars';
    toggleButton.textContent = 'Показати семінари';

    shopContent.parentNode.insertBefore(toggleButton, shopContent);

    toggleButton.addEventListener('click', () => {
      if (shopContent.style.display === 'none') {
        shopContent.style.display = 'block';
        toggleButton.textContent = 'Закрити семінари';
      } else {
        shopContent.style.display = 'none';
        toggleButton.textContent = 'Показати семінари';
      }
    });

    const filePath = '../xlsx/shop.xlsx'; 
    fetch(filePath)
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Помилка завантаження файлу: ' + resp.statusText);
        }
        return resp.arrayBuffer();
      })
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        shopContent.innerHTML = '';

        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'tabs-container';
        shopContent.appendChild(tabsContainer);

        const contentContainer = document.createElement('div');
        contentContainer.id = 'sheet-content';
        shopContent.appendChild(contentContainer);

        workbook.SheetNames.forEach((sheetName, idx) => {
          const tab = document.createElement('button');
          tab.className = 'tab-button';
          tab.textContent = sheetName;
          tab.dataset.sheet = sheetName;
          if (idx === 0) tab.classList.add('active');
          tab.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            tab.classList.add('active');
            loadSheetData(sheetName, workbook, contentContainer);
          });
          tabsContainer.appendChild(tab);
        });

        loadSheetData(workbook.SheetNames[0], workbook, contentContainer);
      })
      .catch(err => console.error('Помилка:', err));
  }

  const details = document.querySelectorAll('.details');
  details.forEach(detail => {
    detail.style.cursor = 'pointer';
    detail.addEventListener('click', function() {
      const detailsBlock = this.querySelector('.details-block');
      if (detailsBlock) {
        detailsBlock.classList.toggle('show');
      }
    });
  });

  if (window.jQuery) {
    if ($(window).width() >= 1000) {
      $('.intro').animate({ opacity: 1 }, 500, function() {
        $('.content').animate({ opacity: 1 }, 2500);
        setTimeout(function() {
          $('.intro').animate({ opacity: 0 }, 2500, function() {
            $('body').css('filter', 'none');
          });
        }, 500);
      });
    } else {
      $('.intro').remove();
      $('.content').css('opacity', 1);
    }
  }
});

function loadSheetData(sheetName, workbook, container) {
  container.innerHTML = '';

  const header = document.createElement('h2');
  header.className = 'category-title';
  header.textContent = `Категорія: ${sheetName}`;
  container.appendChild(header);

  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  console.log(`Дані для аркуша "${sheetName}":`, jsonData);

  const grid = document.createElement('div');
  grid.className = 'shop-grid';
  container.appendChild(grid);

  if (jsonData.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'Немає даних в цьому аркуші.';
    grid.appendChild(emptyMsg);
    return;
  }

  jsonData.forEach(item => {
    const normalizedItem = {};
    Object.keys(item).forEach(key => {
      normalizedItem[key.trim().toUpperCase()] = item[key];
    });

    const card = document.createElement('div');
    card.className = 'shop-card';

    const titleText = normalizedItem["NAME"] || normalizedItem["НАЗВАНИЕ"] || 'Немає назви';
    const title = document.createElement('h3');
    title.className = 'shop-card-title';
    title.textContent = titleText;
    card.appendChild(title);

    const langText = normalizedItem["LANG"] || normalizedItem["ЯЗЫК"] || '';
    const lang = document.createElement('p');
    lang.className = 'shop-card-lang';
    lang.textContent = `Мова: ${langText}`;
    card.appendChild(lang);

    const priceValue = normalizedItem["PRICE"] || normalizedItem["ЦЕНА"] || normalizedItem["ЦІНА"] || '';
    const price = document.createElement('p');
    price.className = 'shop-card-price';
    price.textContent = `Ціна: ${priceValue}$`;
    card.appendChild(price);

    grid.appendChild(card);
  });
}

