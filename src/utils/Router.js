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

class Router {
  routes;
  rootQuery;
  constructor(rootQuery) {
    this.routes = [];
    this.rootQuery = rootQuery;
  }

  use(pathname, componentClass) {
    const component = new componentClass();
    const route = render(this.rootQuery, component);
    this.routes.push({ pathname, route });
    return this;
  }
}

export default new Router("#root");
