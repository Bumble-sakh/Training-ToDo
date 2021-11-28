const tasks = [
    {
      _id: '5d2ca9e2e03d40b326596aa7',
      completed: true,
      body:
        'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
      title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
      _id: '5d2ca9e29c8a94095c1288e0',
      completed: false,
      body:
        'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
      title:
        'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
      _id: '5d2ca9e2e03d40b3232496aa7',
      completed: true,
      body:
        'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
      title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
      _id: '5d2ca9e29c8a94095564788e0',
      completed: false,
      body:
        'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
      title:
        'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];
  
(function(arrOfTasks) {

    const objOfTasks = arrOfTasks.reduce((acc, task) => {
      acc[task._id] = task;
      return acc;
    }, {});

    const themes = {
      default: {
        '--base-text-color': '#212529',
        '--header-bg': '#007bff',
        '--header-text-color': '#fff',
        '--default-btn-bg': '#007bff',
        '--default-btn-text-color': '#fff',
        '--default-btn-hover-bg': '#0069d9',
        '--default-btn-border-color': '#0069d9',
        '--danger-btn-bg': '#dc3545',
        '--danger-btn-text-color': '#fff',
        '--danger-btn-hover-bg': '#bd2130',
        '--danger-btn-border-color': '#dc3545',
        '--input-border-color': '#ced4da',
        '--input-bg-color': '#fff',
        '--input-text-color': '#495057',
        '--input-focus-bg-color': '#fff',
        '--input-focus-text-color': '#495057',
        '--input-focus-border-color': '#80bdff',
        '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
      },
      dark: {
        '--base-text-color': '#212529',
        '--header-bg': '#343a40',
        '--header-text-color': '#fff',
        '--default-btn-bg': '#58616b',
        '--default-btn-text-color': '#fff',
        '--default-btn-hover-bg': '#292d31',
        '--default-btn-border-color': '#343a40',
        '--default-btn-focus-box-shadow':
          '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        '--danger-btn-bg': '#b52d3a',
        '--danger-btn-text-color': '#fff',
        '--danger-btn-hover-bg': '#88222c',
        '--danger-btn-border-color': '#88222c',
        '--input-border-color': '#ced4da',
        '--input-bg-color': '#fff',
        '--input-text-color': '#495057',
        '--input-focus-bg-color': '#fff',
        '--input-focus-text-color': '#495057',
        '--input-focus-border-color': '#78818a',
        '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      },
      light: {
        '--base-text-color': '#212529',
        '--header-bg': '#fff',
        '--header-text-color': '#212529',
        '--default-btn-bg': '#fff',
        '--default-btn-text-color': '#212529',
        '--default-btn-hover-bg': '#e8e7e7',
        '--default-btn-border-color': '#343a40',
        '--default-btn-focus-box-shadow':
          '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        '--danger-btn-bg': '#f1b5bb',
        '--danger-btn-text-color': '#212529',
        '--danger-btn-hover-bg': '#ef808a',
        '--danger-btn-border-color': '#e2818a',
        '--input-border-color': '#ced4da',
        '--input-bg-color': '#fff',
        '--input-text-color': '#495057',
        '--input-focus-bg-color': '#fff',
        '--input-focus-text-color': '#495057',
        '--input-focus-border-color': '#78818a',
        '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      },
    };

    //Elements UI
    const listContainer = document.querySelector('.tasks-list-section .list-group');
    const form = document.forms['addTask']
    const inputTitle = form.elements['title']
    const inputBody = form.elements['body']
    const themeSelect = document.querySelector('#themeSelect')


    //Events  
    renderAllTasks(objOfTasks);

    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeleteHandler);
    themeSelect.addEventListener('change', onThemeSelectHandler);

    //Functions
    function renderAllTasks (tasksList) {
        if(!tasksList) {
            console.error('Передайте список задач!');
            return;
        }

        const fragment = document.createDocumentFragment();        
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li)
        });

        listContainer.appendChild(fragment)
    }

    function listItemTemplate({_id, title, body} = {}){
        const li = document.createElement('li')
        li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
        li.dataset.taskId = _id;

        const span = document.createElement('span')
        span.textContent = title;
        span.style.fontWeight = "bold";

        const article = document.createElement('p')
        article.classList.add('mt-2', 'w-100')
        article.textContent = body

        const btn = document.createElement('button')
        btn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn')
        btn.textContent = 'Delete task'

        li.appendChild(span)
        li.appendChild(article)
        li.appendChild(btn)

        return li;
    }

    function onFormSubmitHandler(e) {
        e.preventDefault();

        const title = inputTitle.value;
        const body = inputBody.value;

        if(!title || !body) {
            alert('Insert title and body')
            return;
        }

        const task = createNewTask(title, body);
        const listItem = listItemTemplate(task);
        listContainer.insertAdjacentElement('afterbegin', listItem)

        form.reset();

    }

    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            complited: false,
            _id: `task - ${Math.random()}`
        }

        objOfTasks[newTask._id] = newTask;

        return {...newTask};
    }

    function isConfirm(id) {
      const {title} = objOfTasks[id];
      const isConfirm = confirm(`Delete task: "${title}" ?`);
      return isConfirm;
    }

    function deleteTask(id) {
      delete objOfTasks[id];
    }

    function deleteTaskFromHtml(el) {
      el.remove();
    }

    function onDeleteHandler ({target}) {
      if(target.classList.contains('delete-btn')) {
        const parent = target.closest(['[data-task-id]']);
        const id = parent.dataset.taskId;
        const confirm = isConfirm(id);
        if(confirm) {
          deleteTask(id);
          deleteTaskFromHtml(parent);
        }        
      }
    }

    function onThemeSelectHandler (e) {
      const selectedThem = themeSelect.value;
      setTheme(selectedThem)
    }

    function setTheme(name) {
      const selectedThemeObj = themes[name];
      Object.entries(selectedThemeObj).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value)
      })
    }
    
})(tasks);
