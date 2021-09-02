import {LitElement, html, css} from 'lit';
import '../../data/shop-categorydata.js';
import { commonStyles } from '../../styles/common-styles.js';
import '../../components/shop-image';
import './shop-list-item.js';

export class ShopList extends LitElement {
  static get styles() {
    return [
        commonStyles,
        css`
        
        .grid {
          display: flex;
          flex-wrap: wrap;
          margin: 0 10px 32px 10px;
          padding: 0;
          list-style: none;
        }

        .grid li {
          -webkit-flex: 1 1;
          flex: 1 1;
          -webkit-flex-basis: 33%;
          flex-basis: 33%;
          max-width: 33%;
            padding-bottom: 35px;
        }

        .grid a {
          display:block;
          text-decoration: none;
        }
        
        shop-image {
            position: relative;
            height: 320px;
            overflow: hidden;
        }

        @media (max-width: 567px) {
          .hero-image {
            display: none;
          }
        
        shop-image{
          display: none;
        }

        .grid  li {
           -webkit-flex-basis: 50%;
           flex-basis: 50%;
           max-width: 50%;
        }`
  ]}

  constructor() {
    super();
    this.item =0;
  }    

  static get properties() {
    return {
      item: { type: Object },
      location: { type: String },
      selectedItem: {type: Object}
    };
  }

  handleCategoriesChanged(e) {
    this.categories = e.detail.categories.value;
    for(let i=0; i<this.categories.length ;i++){
        if(this.location==this.categories[i].id){
                this.item = this.categories[i];
        }
    }
  }

  handleItemChanged(e) { 
    for(let i=0; i<this.item.items.length ;i++){
        if(this.item.items[i].productId==e.detail.item){
            this.selectedItem=this.item.items[i];
        }
    }    
  }


  getPluralizedQuantity(quantity) {
    if (!quantity) {
      return '';
    }
    let pluralizedQ = quantity === 1 ? 'item' : 'items';
    return  '(' + quantity + ' ' + pluralizedQ + ')';
  }

  render() {
    return html`
      <shop-categorydata  @categories-changed="${this.handleCategoriesChanged}" categoryName=${this.location}></shop-categorydata>
      <shop-image .src=${this.item.mediaUrl} .alt=${this.item.categoryName}></shop-image>
      
      <header>
          <h1>${this.item.categoryName}</h1> 
            ${(this.item.items!=undefined) ?   html`  <span>${this.getPluralizedQuantity(this.item.items.length)}</span>`: html``}
      </header>
    
      ${(this.item.items!=undefined) ?
        html`
          <ul class="grid">
              ${ this.item.items.map(it => html`
              <li>
                  <a href="/list-item/${this.item.id}/${it.productId}"><shop-list-item image=${it.media.url} title=${it.name} id=${it.productId} price=${it.price.sellingPrice} @item-changed="${this.handleItemChanged}"></shop-list-item></a>
              </li>`
              )}
          </ul>`: html``}`
  }
}
