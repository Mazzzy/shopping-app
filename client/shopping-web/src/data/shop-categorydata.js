import {LitElement } from 'lit';

const categoryList = [
    {
        "categoryName": "New in our shop",
        "id": "123456",
        "mediaUrl": "https://ing.nl/punten/media/file/26839.png",
    },
    {
        "categoryName": "Promotions",
        "id": "654321",
        "mediaUrl": "https://ing.nl/punten/media/file/26786.png"
    },
];

class ShopCategorydata extends LitElement {

    static get properties() {   
        return {
            categoryName:{type: String},
            categories: {type: Object},
        }  
  }  

 constructor() {
    super();
    this.categories= {
      type: Object,
      value: categoryList,
      readOnly: true,
      notify: true
    }
 }


 updated(changedProperties) {
    if (changedProperties.has('categoryName') || changedProperties.has('categories')) {   
        const myEvent  = new CustomEvent('categories-changed', {
        bubbles: true, 
        composed: true, 
        detail: {
            categories:this.categories
        }
        });
        this.dispatchEvent(myEvent);  
    }
   this.computeCategory();
 }

 getCategoryObject() {
    for (let i = 0, c; c = this.categories.value[i]; ++i) {
        if(c.id===this.categoryName){
            return c;
        } 
    }
 }

 computeCategory() {
    const categoryObj =this.getCategoryObject();
    this.fetchItems(categoryObj);
    return categoryObj;
 }
  
 fetchItems(category) {  
    
    if (!category || category.items) {
      return;
    }
    
    this.getResource({
      url: `mock-data/${  category.id  }.json`,
      onLoad(e) {
        category.items= JSON.parse(e.target.responseText);
      }
    });
 }

 getResource(rq) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', rq.onLoad.bind(this));
    xhr.open('GET', rq.url);
    xhr.send();
  }
}

customElements.define('shop-categorydata',ShopCategorydata)