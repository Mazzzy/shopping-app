import { LitElement, html, css } from 'lit';

export class ShopRippleContainer extends LitElement {
  static get styles() {
    return css`
        :host {
          display: inline-block;
          position: relative;
        }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
