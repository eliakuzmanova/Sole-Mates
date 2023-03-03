import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { logout } from "./user.js";
import { getUserData } from "./util.js";
import page from "../../node_modules/page/page.mjs";

const header = document.querySelector("header")

export function updateNav() {
    const user = getUserData()
    render(navTemplate(user,onLogout), header)
    

    function onLogout(ev) {
        ev.preventDefault()
        logout();
        updateNav()
        page.redirect("/catalog")
    }
}

function navTemplate(user,onLogout) {
    return html`
    <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
          <div>
            <a href="/catalog">Dashboard</a>
            <a href="/search">Search</a>
          </div>

          ${user
          ? html`
          <div class="user">
            <a href="/create">Add Pair</a>
            <a @click = ${onLogout} href="javascript:void(0)">Logout</a>
          </div>
          `
          : html `
           <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
          `
        }

        </nav>
`
}