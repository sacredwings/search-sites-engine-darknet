// @ts-nocheck
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mongo, minio } from "@/utility/connect"
import Config from "../../../../../config.json";
import { CSite }  from "@/class/site"
import Joi from "joi";
import {Authentication} from "@/app/api/function";

export async function GET(request: Request) {
    let value
    try {
        try {
            let url = {
                domain: request.nextUrl.searchParams.get('domain') as string,
            }

            //схема
            const schema = Joi.object({
                domain: Joi.any().valid('adnl', 'ton', 'onion').allow(null).empty('').default(null),
            })
            value = await schema.validateAsync(url)
        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }

        try {
            await mongo()

            let arFields = {
                domain: value.domain,
            }

            let count = await CSite.Count(arFields)

            return NextResponse.json({
                code: 0,
                response: count
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

export const dynamic = 'force-dynamic';
