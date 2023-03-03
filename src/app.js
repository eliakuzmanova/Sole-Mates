import { updateNav } from "./api/nav.js";
import {render} from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs"
import { showHomeView } from "./view/home.js";
import { showRegisterView } from "./view/register.js";
import { showLoginView } from "./view/login.js";
import { showCatalog } from "./view/catalog.js";
import { showDetails } from "./view/details.js";
import { showEdit } from "./view/edit.js";
import { showCreate } from "./view/create.js";
import { showSearch} from "./view/search.js";

const root = document.querySelector("main")

page(middleWare)
page("/", showHomeView)
page("/register", showRegisterView)
page("/login", showLoginView)
page("/catalog", showCatalog)
page("/details/:id", showDetails)
page("/edit/:id", showEdit)
page("/create", showCreate)
page("/search", showSearch)

updateNav()
page.start()

function middleWare(ctx, next) {

    ctx.render = (content) => render(content, root)
    ctx.updateNav = updateNav
    next()
}