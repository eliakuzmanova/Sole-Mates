import { del, get, post, put } from "./api.js";

    export async function getAllShoes() {
       return await get("/data/shoes?sortBy=_createdOn%20desc")
    }

export async function getShoeById(id) {
    return await get(`/data/shoes/${id}`)
}

export async function deleteShoeById(id) {
    return await del(`/data/shoes/${id}`)
}

export async function createShoe(data) {
   return await post("/data/shoes", data)
}

export async function editShoeById(id, data) {
    return await put(`/data/shoes/${id}`, data)
}

export async function searchShoes(word) {
    return await get(`/data/shoes?where=brand%20LIKE%20%22${word}%22`)
}