class PageController {
  elements = null;
  type = null;
  id = null;
  dataQuery = null;
  constructor(containers, type, name, dataQuery) {
    this.elements = {
      page: document.createElement('div'),
      tab_button: document.createElement('button')
    };

    this.type = type;
    this.dataQuery = dataQuery;
    this.id = content_controller.length;

    this.elements.tab_button.className = "accent";
    this.elements.tab_button.innerText = name;
    this.elements.page.className = `content ${type}`;

    containers.tabs.appendChild(this.elements.tab_button);
    containers.contents.appendChild(this.elements.page);
  }

  add() {
    containers.tabs.appendChild(this.elements.tab_button);
    containers.contents.appendChild(this.elements.page);
  }

  remove() {
    this.elements.tab_button.remove();
    this.elements.page.remove()
  }

  swap(page) {
    [
      this.type, page.type,
      this.dataQuery, page.dataQuery,
      this.id, page.id,
      this.elements.page.innerHTML, page.elements.page.innerHTML,
      this.elements.page.className, page.elements.page.className,
      this.elements.page.style, page.elements.page.style,
      this.elements.tab_button.innerText, page.elements.tab_button.innerText
    ] = [
      page.type, this.type,
      page.dataQuery, this.dataQuery,
      page.id, this.id,
      page.elements.page.innerHTML, this.elements.page.innerHTML,
      page.elements.page.className, this.elements.page.className,
      page.elements.page.getAttribute('style'), this.elements.page.getAttribute('style'),
      page.elements.tab_button.innerText, this.elements.tab_button.innerText
    ];

      // [this.elements.page.scrollTop,
      //   page.elements.page.scrollTop]
      //   =
      // [page.elements.page.scrollTop,
      //   this.elements.page.scrollTop];
  }

}

const content_controller = new class PageFactory extends Array {
    static conatiners = {
      tabs: document.querySelector('article>.tabs'),
      contents: document.querySelector('article>.content-wrapper')
    };

    constructor(){super();}

    open(type, name, dataQuery = null){this.push(new PageController(PageFactory.conatiners, type, name, dataQuery));}

    change(index, name, type = null) {

    }

    close(index){
        this[index].remove();
        this.splice(index, 1);
    }
}

//FIX THIS FUCKING SHIT: CRUTCH FOR TESTING!!!
content_controller.open('page', "My page");
content_controller[0].remove();
content_controller[0].elements = {
  tab_button: document.querySelector('.tabs>button:nth-child(1)'),
  page: document.querySelector('.content-wrapper > .content:first-child')
}
//END OF CRUTCH

window.content_controller = content_controller;
