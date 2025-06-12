const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-btn');

// Зареждаме задачите от localStorage при стартиране
loadTasks();

// Добавяне чрез бутон
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  createTask(taskText);
  saveTasks();
  taskInput.value = '';
});

// Добавяне чрез Enter
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

// Изчистване на всички задачи
clearBtn.addEventListener('click', () => {
  taskList.innerHTML = '';
  localStorage.removeItem('tasks');
});

// Функция за създаване на нова задача
function createTask(taskText) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.title = 'Изтрий';

  // Маркиране като завършена
  span.addEventListener('click', () => {
    li.classList.toggle('done');
  });

  // Изтриване на отделна задача
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Функция за запис в localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li span').forEach(span => {
    tasks.push(span.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция за зареждане от localStorage
function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach(taskText => {
      createTask(taskText);
    });
  }
}

const langBtn = document.getElementById('lang-toggle');

// Речници с преводи
const translations = {
  bg: {
    title: 'Моят To-Do Списък',
    placeholder: 'Добави задача...',
    addBtn: 'Добави',
    clearBtn: 'Изтрий всички',
    langToggle: 'EN 🇬🇧'
  },
  en: {
    title: 'My To-Do List',
    placeholder: 'Add a task...',
    addBtn: 'Add',
    clearBtn: 'Clear all',
    langToggle: 'BG 🇧🇬'
  }
};

let currentLang = localStorage.getItem('lang') || 'bg';
applyTranslations(currentLang);

// Превключване на езика
langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'bg' ? 'en' : 'bg';
  localStorage.setItem('lang', currentLang);
  applyTranslations(currentLang);
});

// Прилагане на превод
function applyTranslations(lang) {
  document.querySelector('h1').textContent = translations[lang].title;
  taskInput.placeholder = translations[lang].placeholder;
  addBtn.textContent = translations[lang].addBtn;
  clearBtn.textContent = translations[lang].clearBtn;
  langBtn.textContent = translations[lang].langToggle;
}
