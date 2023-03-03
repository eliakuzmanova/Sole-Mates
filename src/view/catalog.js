import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllShoes } from "../api/data.js";



export async function showCatalog(ctx) {
    const shoes = await getAllShoes()
    ctx.render(catalogTemplate(shoes))
}

function catalogTemplate(shoes) {
    return html`
<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->
            ${shoes.length !== 0
            ? shoes.map(shoe => shoeTemplate(shoe))
            : nothing
          }
          </ul>
          ${shoes.length === 0
            ? html `<h2>There are no items added yet.</h2>`
            : nothing
          }

        
        </section>
`}

function shoeTemplate(shoe) {
    return html`
<li class="card">
              <img src="${shoe.imageUrl}" alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${shoe.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${Number(shoe.value)}</span>$</p>
              <a class="details-btn" href="/details/${shoe._id}">Details</a>
            </li>
`}