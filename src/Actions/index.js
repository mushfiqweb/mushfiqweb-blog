import axios from "axios";

/* DEVELOPMENT CLIENTS */
export const apiClientDev = axios.create({
    baseURL: "http://localhost:3030",
    headers: {
        "Content-Type": "application/json"
    }
})


export const scraperClientDev = axios.create({
    baseURL: "http://localhost:3030",
    headers: {
        "Content-Type": "application/json"
    }
})

/* PRODUCTION CLIENTS */

export const apiClientProd = axios.create({
    baseURL: "https://mushfiqweb-api.herokuapp.com",
    headers: {
        "Content-Type": "application/json"
    }
})

export const scraperClientProd = axios.create({
    baseURL: "https://mushfiqweb-scraper.herokuapp.com",
    headers: {
        "Content-Type": "application/json"
    }
})
