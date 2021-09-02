import { LitElement, html, css } from 'lit';
import '../shop-home';
import '../../data/shop-categorydata.js';
import '../../components/shop-tab';
import '../shop-list';
import '../shop-product-detail';
export class ShoppingDashboard extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        padding-top: 10px;
        padding-bottom: 64px;
        min-height: 100vh;
        color: #202020;;
      }

      :host(:not([page=detail])) .back-btn {
        display: none;
      }

            
      .logo a {
        padding-left: 30px;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.3em;
        text-decoration: none;
        color: #000;
        /* required for IE 11, so this <a> can receive pointer events */
        display: inline-block;
        pointer-events: auto;
        cursor: pointer;
      }
          
      .cart-buttoon{
        cursor: pointer;
        padding-right: 20px;
        display: block;
        margin-left: auto;
        background: none;
        border: none;
      }  
        
      #tabContainer {
        position: relative;
        height: 50px;
      }

      shop-tab a:active {         
        border-bottom: 2px solid #172C50;;
      }
     
      shop-tab a:hover {
        background-color: lightgray;
      }

      shop-tabs {
        height: 100%;
      }

      shop-tab {
        margin: 0 10px;
      }

      shop-tab a {
        display: inline-block;
        outline: none;
        padding: 9px 5px;
        font-size: 13px;
        font-weight: 500;
        text-decoration: none;
        color: #202020; 
        cursor: pointer;
      }
        
       .cart-badge {
        position: absolute;
        top: 7px;
        right: 10px;
        width: 20px;
        height: 20px;
        background-color:#172C50;
        border-radius: 50%;
        color: white;
        font-size: 12px;
        font-weight: 500;
        pointer-events: none;
        @apply --layout-vertical;
        @apply --layout-center-center;
      }  

     .app-toolbar{
        display: flex;
        padding-bottom: 25px;
        padding-top: 10px;
     }

     .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }

      /* small screen */
      @media (max-width: 767px) {
    
        .menu-btn {
          display: block;
        }

        :host([page=detail]) .menu-btn {
          display: none;
        }
        
        .app-footer {
            display: none;
        }
        
        @media (max-width: 767px) {    
            shop-tab {
                display: contents
            }            
        }
        
        @media (max-width: 467px) {
           
            #tabContainer {
                height: 70px;
            }
        
             shop-tab a {
                margin-left: 10px;
                margin-right: 10px;
            }
        }
      }
    `;
  }

  static get properties() {
    return {
      page : {type:String}, 
      tab : {type:Boolean},
      categories: {type: Array},
      pageName: { type: String },
      selectedItem: { type: String },
      selectedCategory: { type: String },
      route:{type: String},
    };
  }

  handleCategoriesChanged(e) {
    this.categories = e.detail.categories.value;
  }

  pageChanged(){
    this.tab=false; 
    if(this.location.pathname.split('/')[1] === '') {
      this.page="home"
    } else if(this.location.pathname.split('/')[1]=='list') {
      this.page="list";
      this.pageName = this.location.pathname.split('/')[2]
    } else if(this.location.pathname.split('/')[1]=='list-item') {
      this.page="detail";
      this.selectedCategory = this.location.pathname.split('/')[2]
      this.selectedItem = this.location.pathname.split('/')[3]
      this.route = this.location.pathname.split('/')[4]
     
    }
  
  }

  render() {
    this.pageChanged();
    return html`
      <main>
        <shop-categorydata  @categories-changed="${this.handleCategoriesChanged}"></shop-categorydata>
        <div class="app-toolbar">
          <div class="logo"><a href="/">ACME SHOPPING</a></div>  
          <button class="cart-buttoon"> <a href="/cart" ><img src="assets/shopping-cart.png" alt="shopping-cart-icon" id> </a></button> 
        </div>
      
        ${(this.categories !== undefined && !this.tab) ? 
          html`<div id="tabContainer">  
              ${this.categories.map(item => html`<shop-tab name="${item.id}"><a href="/list/${item.id}">${item.categoryName}</a></shop-tab>`)}
            </div>` :  html``}
          
        ${ (this.page === 'home')? 
          html`<shop-home .categories=${this.categories}></shop-home>` :  html``}

        ${ (this.page=='list')? 
          html `<shop-list location=${this.pageName}></shop-list>` :  html``} 
        
        ${ (this.page=='detail')? 
          html ` <shop-product-detail .item=${this.selectedItem} .category=${this.selectedCategory} .route=${this.route} @add-cart-item=${this.onAddCartItem}></shop-product-detail>` :  html``}
              
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Mazzzy"
          >Mazzzy</a
        >.
      </p>
    `;
  }
}
