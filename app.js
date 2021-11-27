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

    //Elements UI
    const listContainer = document.querySelector('.task-list-section .list-group');
    const form = document.forms['addTask']
    const inputTitle = form.elements['title']
    const inputBody = form.elements['body']

    //Events  
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);

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
    
})(tasks);