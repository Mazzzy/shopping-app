import { LitElement, html, css } from 'lit';

export class NotFound extends LitElement {
  static get styles() {
    return css`
      
    `;
  }

  render() {
    return html`
      <div>
        <h1>Sorry, we couldn't find that page</h1>
      </div>
      <a href="/">Go to the home page</a>
    `;
  }
}
