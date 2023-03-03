import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { searchShoes } from "../api/data.js";
import { createSubmitHandler, getUserData } from "../api/util.js";


export async function showSearch(ctx) {

    const user = getUserData()
    const isUser = Boolean(user)
    ctx.render(searchTemplate(createSubmitHandler(onSubmit)))

    async function onSubmit({ search }) {
        if (!search) {
            alert("Field should not be empty")
            return
        }
        const shoes = await searchShoes(search)
        ctx.render(resultTemplate(shoes, isUser, search,onSubmit))
    }
}

function searchTemplate(onSubmit) {
    return html`
    <section id="search">
        <h2>Search by Brand</h2>
    
        <form @submit=${onSubmit} class="search-wrapper cf">
            <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
            <button type="submit">Search</button>
        </form>
    
        <h3>Results:</h3>
    
    </section>
 `
}

function resultTemplate(shoes, isUser, search, onSubmit) {
    return html`
    <section id="search">
        <h2>Search by Brand</h2>
    
        <form @submit=${onSubmit} class="search-wrapper cf">
            <input id="#search-input" type="text" name="search" placeholder="Search here..." value="${search}"
                required />
            <button type="submit">Search</button>
        </form>
    
        <h3>Results:</h3>
    
        <div id="search-container">
            <ul class="card-wrapper">
                <!-- Display a li with information about every post (if any)-->
                ${shoes.length !== 0
                ? shoes.map(shoe => cardTemplate(shoe, isUser))
                : nothing
                }
            </ul>

            ${shoes.length === 0
            ? html`
            <h2>There are no results found.</h2>
            `
            : nothing
            }
        </div>
    </section>
    
    `
}

function cardTemplate(shoe, isUser) {
    return html`
    <li class="card">
        <img src="${shoe.imageUrl}" alt="travis" />
        <p>
            <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
        </p>
        <p>
            <strong>Model: </strong><span class="model">${shoe.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
        ${isUser
        ? html `<a class="details-btn" href="/details/${shoe._id}">Details</a>`
        : nothing
        }
        
    </li>
    `
}