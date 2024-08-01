# Блок Progress

---

В тестовом задании, я выполнил реализацию блока Progress на ванильном JS, без использования сторонних библиотек.  
Я постарался использовать компонентый подход и реализовал его через базовый класс Component, от которго
наследовались другие компоненты

## Инструменты для разработки

---

### Сборщик проекта

В качестве сборщика проекта я использовал легковесный и простой в использовании Parcel  
Чтобы запустить проект в dev режиме нужно выполнить команду:  
`npm run start`

---

### Линтеры

В качестве линтера, я выбрал prettier с обычным конфигом, команда:  
`npm run prettier`

---

## Структура проекта

| src ↓ |              |                                       |                                                                                        |
| :---: | :----------: | :-----------------------------------: | :------------------------------------------------------------------------------------: |
|       | components ↓ |                                       | Папка с компонентами, где каждый компонент представлят из себя JS файл и модульный CSS |
|       |              |           (componentName) ↓           |                                                                                        |
|       |              |   Button.js <br/> Button.module.css   |                                                                                        |
|       |   pages ↓    |                                       |                               Папка с главной страницей                                |
|       |              |              MainPage ↓               |                                                                                        |
|       |              | MainPage.js <br/> MainPage.module.css |                                                                                        |
|       |   utils ↓    |                                       |                 Основная логика приложения, класс компонента и роутера                 |
|       |              | Component.js<br/> Router.js <br/> ... |                                                                                        |
|       |  index.html  |                                       |                                                                                        |
|       |   index.js   |                                       |                                                                                        |

## css модули используются для избежания наложения стилей

## Описание базовых классов

---

Component.js

```js
export class Component {
  // свойства
  events; // навешиваемые эвенты
  _element; // сам элемент
  children; // дочерние элементы

  // в конструктор класса, я передаю эвенты и детей
  constructor(events = {}, children = []) {
    this.events = events;
    this._element = null;
    this.children = children;
    this.init();
  }

  // в методе init, я иницилиазирую детей, если они есть
  init() {}

  // в методе _addEvents прохожусь по объекту эвентов, и присваиваю их данному компоненту (элементу)
  _addEvents() {
    if (!this._element) return;
    Object.keys(this.events).forEach((eventName) => {
      this._element.addEventListener(eventName, this.events[eventName]);
    });
  }

  // в методе _removeEvents аналогично удаляются эвенты
  _removeEvents() {
    if (!this._element) return;
    Object.keys(this.events).forEach((eventName) => {
      this._element.removeEventListener(eventName, this.events[eventName]);
    });
  }

  // метод show отвечает за отображение элемента, если он скрыт
  show() {
    if (this._element) {
      this._element.style.display = "flex";
    }
  }

  // метод hide скрывает элемент
  // (тут я использовал display = none, для того, чтобы в дальнейшем если потребуется скрыть элемент, не вызывался
  // рендер всего дерева)
  hide() {
    if (this._element) {
      this._element.style.display = "none";
    }
  }

  // в методе render, передается обычная строка с "html" кодом
  // сначала создается нода заглушка, с тэгом template,
  // далее из входной строки удаляются пробелы и "код компонента" вставляется в template,
  // после этого в свойство _element передаётся первый элемент из template (то есть код компонента должен содержать
  // одного родителя)
  // далее добавляются эвенты и рендерятся дочерние элементы
  // в конце возвращается код компонента

  render(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();

    this._element = template.content.firstChild;
    this._addEvents();

    this._renderChildren();

    return this._element;
  }

  // метод используемый для рендера дочерних элементов:
  // При условии если существует родитель
  // Происходит итерация по объекту дочерних элементов,
  // где ключи это название, а значение сами компоненты
  // placeholder - это корневой элемент, в котором ищутся дочерние
  // отображение самого компонента в родительском выглядит так:
  // <div data-component="value"></div>, поэтому далее происходит поиск
  // по элементу со свойством, соответствующим имени компонента,
  // если он найден, вызывается метод render, переданного компонента
  // В конце placeholder заменяется настоящим компонентом
  _renderChildren() {
    if (!this._element) return;
    Object.entries(this.children).forEach(([name, component]) => {
      const placeholder = this._element.querySelector(
        `[data-component="${name}"]`,
      );
      if (placeholder) {
        const content = component.render();
        placeholder.replaceWith(content);
      }
    });
  }
}
```

---

Router.js

```js
// Функция render
// Ищет корневой элемент (в частности с id = root)
// Очищает его от предыдущих компонентов (если в приложении несколько страниц)
// Вызывает метод render у переданного компонента и добавляет в корень
function render(query, component) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`Cannot find root element with query: ${query}`);
  }
  root.innerHTML = "";

  const content = component.render();
  root.appendChild(content);

  return root;
}

//Класс Router (в приложении используется только для рендера одной страницы)
class Router {
  routes; // массив, в котором хранится массив роутов
  rootQuery; // CSS селектор для корневого элемента, в который будут рендериться компоненты.

  // в конструкторе инициализируется массив роутов и задаётся корневой элемнт
  constructor(rootQuery) {
    this.routes = [];
    this.rootQuery = rootQuery;
  }

  // В методе use:
  // Создается новый экземпляр классового компонента (страница)
  // Вызывается функция render, для переданного компонента в корневой элемент
  // Далее в роуты передаётся маршрут (то на каком роуте будет отрисован компонент)
  //
  // (метод this, позволяет использовать цепочку вызовов)
  use(pathname, componentClass) {
    const component = new componentClass();
    const route = render(this.rootQuery, component);
    this.routes.push({ pathname, route });
    return this;
  }
}

// Определяем div с id = root как корневой
export default new Router("#root");
```

---

## Пример использования компонента

```js
// Наследуем компонента от базового класса Component
export class HideComponent extends Component {
  constructor(updateHideValue) {
    super();
    // создаём поля для "пропсов"
    this.updateHideValue = updateHideValue;
  }

  // в методе init создаётся дочерний компонент
  init() {
    this.children = {
      checkbox: new CheckBox((isChecked) =>
        this.handleUpdateHideValue(isChecked),
      ),
    };
  }

  //функция с логикой внутри компонента
  handleUpdateHideValue(isHidden) {
    if (this.updateHideValue) {
      this.updateHideValue(isHidden);
    }
  }

  // в методе render пишется "html код" (в строке) самого компонента
  render() {
    const htmlString = `
        <div class="${styles.hideContainer}">
            //место для дочернего компонента
            <div data-component="checkbox"></div>
            <label class="${styles.hideLabel}">Hide</label> 
        </div>
        `;
    return super.render(htmlString);
  }
}
```

---

## Проблемные места

1. Отсутствие хранилища -  
   из-за отсуствтия хранилища, становится проблематично передавать пропсы вниз,
   возникает проблема props-drilling. Также из-за отсуствия механизма передачи пропсов
   в базовом компоненте (Component.js), приходится передавать состояние в колбеках
2. Использование Router -
   по факту, для мини приложения, не нужен роутер, тут я скорее использовал его как бы
   подразумевая то, что в дальнейшем приложение может состоять из нескольких страниц (по факту функционал с роутами не дописан)
3. Плохая верстка - я затратил много времени и сил, чтобы попытаться сверстать что-то
   похожее на оригинал, но к сожалению получилось только "похожее"

### P.S.

Я старался применить свои знания и креативно подойти к решению тестового задания.
Мой подход, затратил большее количество времени, чем, к примеру, написание всего кода
в одном файле HTML, которое можно было бы потратить на вёрстку.
