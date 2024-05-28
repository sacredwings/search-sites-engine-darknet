// @ts-nocheck
import { NextResponse } from 'next/server'
import Joi from "joi"
import Config from "../../../../../config.json"
import { Store, DB, CPost }  from "../../../../../../social-framework/src"
import {Authentication} from "@/app/api/function";
import {mongo} from "@/utility/connect";
import config from "../../../../../config.json";
import {serverCheckResult} from "recaptcha-v3-react-function-async";
import { CSite }  from "@/class/site"

export async function POST(request: Request) {

    const res = await request.json()

    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                image_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),

                title: Joi.string().min(3).max(255).required(),
                description: Joi.string().min(1).max(99999).allow(null).empty('').default(null),

                domain: Joi.any().valid('adnl', 'ton', 'onion').required(),
                domain_address: Joi.string().min(3).max(255).required(),

                gtoken: Joi.string().required()
            })
            value = await schema.validateAsync(res)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }

        if (!await serverCheckResult(value.gtoken, config.google.reCaptcha.secret)) throw ({code: 910, msg: 'Проверка reCaptcha'})

        try {
            await mongo()

            let arFields = {
                image_id: value.image_id,

                title: value.title,
                description: value.description,

                domain: value.domain,
                domain_address: value.domain_address
            }

            let result = await CSite.Add(arFields)

            return NextResponse.json({
                code: 0,
                response: result
            })
        } catch (err) {
            console.log(err)
            throw ({...{code: 100000, msg: 'Ошибка в коде'}, ...err})
        }

    } catch (err) {
        console.log(err)
        return NextResponse.json(err)
    }


}
