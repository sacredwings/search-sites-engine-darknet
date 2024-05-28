// @ts-nocheck
import {
    interfaceSiteAdd,
    interfaceSiteGet,
    interfaceSiteGetById
} from './url_api_type'
import axios, {AxiosRequestConfig} from "axios"
import {ToastSystemAdd} from "@/component/toast/function";
import config from "../../../config.json";
import {reCaptchaExecute} from "recaptcha-v3-react-function-async"
import {getCookies, getCookie} from "cookies-next"

export async function ServerSiteAdd ({
    image_id=null,

    title,
    description=null,

    domain,
    domain_address
}: interfaceSiteAdd){
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`
    let gtoken = await reCaptchaExecute(config.google.reCaptcha.public, `album_add`)

    let arFields = {
        image_id,

        title,
        description,

        domain,
        domain_address,

        gtoken
    } as interfaceTopicAdd

    const url = `/api/site/add`
    console.log(url)
    let res = await axios.post(url, arFields)
    //await ToastSystemAdd(res.data)
    return res.data.response
}

export async function ServerSiteGet ({
    q=null,

    domain=null,

    offset=0,
    count=20,
}: interfaceSiteGet,{
    cookies=null
}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            q,

            domain,

            offset,
            count
        } as interfaceSiteGet,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    const url = `/api/site/get`
    console.log(url)
    let result = await axios.get(url, arFields)
    return result.data.response
}

export async function ServerSiteGetById ({ids}: interfaceSiteGetById, {cookies=null}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            ids
        } as interfaceSiteGetById,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    const url = `/api/site/getById`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}

function is_server () {
    return ! (typeof window != 'undefined' && window.document);
}
