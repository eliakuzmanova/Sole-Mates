import {html} from "../../node_modules/lit-html/lit-html.js"
import { editShoeById, getShoeById } from "../api/data.js"
import { createSubmitHandler } from "../api/util.js"

export async function showEdit(ctx) {
    const id = ctx.params.id
    const shoe = await getShoeById(id)
    ctx.render(editTemplate(shoe, createSubmitHandler(onSubmit)))

   async function onSubmit({brand, model, imageUrl, release, designer, value}) {
        
    if (!brand || !model || !imageUrl || !release || !designer || !value) {
            alert("All fields are required")
            return
        }

       await editShoeById(id,{
        brand,
        model, 
        imageUrl, 
        release, 
        designer, 
        value
      }
      )

        ctx.page.redirect(`/details/${id}`)
    }
}

function editTemplate(shoe, onSubmit) {
return html`
 <section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form @submit = ${onSubmit} class="edit-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value = "${shoe.brand}"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value = "${shoe.model}"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value = "${shoe.imageUrl}"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value = "${shoe.release}"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value = "${shoe.designer}"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value = "${shoe.value}"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`
}