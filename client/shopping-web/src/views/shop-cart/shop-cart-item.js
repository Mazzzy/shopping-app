import { LitElement, html, css } from 'lit';
import { selectStyles} from '../../styles/select-styles.js';
import '../../components/shop-image';

class ShopCartItem extends LitElement {
   static get styles() {
    return [
      selectStyles,
      css`
        :host {
          display: flex;    
          position: relative;
          margin-bottom: 24px;
        }

        shop-image {
          position: relative;    
          width: 72px;
          height: 72px;
          overflow: hidden;    
        }

        #quantitySelect{    
          width: fit-content;
        }      
            
        shop-select { 
          width: 50%;
        }          

        shop-select > select {
          font-size: 16px;
          padding-left: 40px;
        }

        shop-select > shop-md-decorator {
          font-size: 12px;
          border: none;
        }

        .name {
          display: flex;
          width: 358px;
          text-align: left;    
          line-height: 20px;
          font-weight: 500;
          float: left;
          margin-top: 26px;
          margin-right: 30px;
        }

        .delete-button a{
          text-decoration: none;
          color:#757575;
        }
    
        .name a {
          padding-top: 5px;  
          display: inline-block;
          max-width: 100%;
          text-decoration: none;
          color: #202020;
          white-space: nowrap;
        
        }
            

        .price {
          font-weight:400;    
          display: inline-block;
          white-space: nowrap;
          color: #757575;
          min-width: 70px;
          width: 100px;
        }

        .quantity {
          margin-right: -35px;    
          min-width: 50px;
          width: 160px;
        }

        .delete-button {
          padding-top: 10px;    
          background: none;
          border: none;    
          width: 34px;
          height: 34px;
          color: #757575;
          display: inline-block;
          top: 18px;
          right: 0;
        }
   

        .flex {
          display: table-row;
          margin-left: 24px;
        }

        .detail {
          display: -webkit-box; 
          margin-top: 26px;
          margin-right: 30px;
          height: 20px;
        }

        @media(max-width: 1000px){
          .name{
              width: 220px;
          }
          .quantity{
              width: 90px;
          }
          .price{
              width: 90px;
          }       
        }   
         

        @media (max-width: 667px) {
          .flex {
            margin-left: 10px;
            display:grid;  
          }

          .name {
            margin-top: 16px;
            margin-right: 0;
            width: calc(100% - 40px);
          }

          .detail {
            margin: 10px 10px 0 0;
          }

          .quantity, .price {
            text-align: right;
            width: auto;
          }

          .delete-button {
            top: 8px;
          }
        }
      `
    ]
 }

  static get properties() {
    return {
      entry:{type: Array},
      route:{type: String}
    }
  }

  quantityChange() {
    this.setCartItem(parseInt(this.shadowRoot.getElementById("quantitySelect").value, 10));
    if(this.route=="r" || this.route==undefined){
      this.route="s";
    } else{
      this.route="r";
    }
  }

  setCartItem(quantity) {
    this.dispatchEvent(new CustomEvent('set-cart-item', {
        bubbles: true, composed: true, detail: {
          item: this.entry.item,
          quantity: quantity
        }
      }
    ));
  }

  formatPrice(price) {
    return price ? '$' + price.toFixed(2) : '';
  }

  removeItem() {
    this.setCartItem(0);
    if(this.route=="r" || this.route==undefined){
      this.route="s";
    } else{
      this.route="r";
    }
  }

  
  render(){
    const { item, quantity } = this.entry;
    return html`
      <a href="/list-item/${item.category}/${item.name}" title="${item.name}">
        <shop-image src="${item.media.url}" alt="${item.name}"></shop-image>
      </a>
      <div class="flex">
        <div class="name">
          <a href="/list-item/${item.category}/${item.name}">${item.name}</a>
        </div>
        <div class="detail">
          <div class="quantity">
            <shop-select>
              <label prefix="">Qty:</label>
            
              <select id="quantitySelect" aria-label="Change quantity" .value=${quantity} @change=${this.quantityChange}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
          
              <shop-md-decorator aria-hidden="true"></shop-md-decorator>
            </shop-select>
          </div>
          <div class="price">${this.formatPrice(quantity * item.price.sellingPrice)}</div>
          <button class="delete-button"  @click =${this.removeItem}>
              <a href="/cart/${this.route}"> X  </a>  
          </button>
        </div>
      </div>
    `   
  }

}

customElements.define('shop-cart-item' , ShopCartItem);
