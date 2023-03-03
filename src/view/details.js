import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import { deleteShoeById, getShoeById } from "../api/data.js";
import { getUserData } from "../api/util.js";

export async function showDetails(ctx) {
    
    const id = ctx.params.id
    const shoe = await getShoeById(id)
    
    const user = getUserData()
    let isUser = Boolean(user)
    let isOwner = isUser && user._id == shoe._ownerId

    ctx.render(detailsTemplate(shoe, isUser, isOwner, onDelete, onEdit))

    async function onDelete(ev) {
       const isConfirm = confirm("Are you sure you want to delete")

       if (isConfirm) {
        await deleteShoeById(id)
        ctx.page.redirect(`/catalog`)
       } else {
        return
       }
        
    }

    async function onEdit(ev) {
        ctx.page.redirect(`/edit/${id}`)
    }
}



function detailsTemplate(shoe, isUser, isOwner, onDelete, onEdit) {
return html`
 <section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src=${shoe.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
              <p>
                Model: <span id="details-model">${shoe.model}</span>
              </p>
              <p>Release date: <span id="details-release">${shoe.release}</span></p>
              <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
              <p>Value: <span id="details-value">${shoe.value}</span></p>
            </div>
            ${isOwner?
            html`
              <!--Edit and Delete are only for creator-->
              <div id="action-buttons">
              <a @click = ${onEdit} href="/edit/${shoe._id}" id="edit-btn">Edit</a>
              <a @click = ${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>
            `
            : nothing
        }
          
          </div>
        </section>
         
`
}