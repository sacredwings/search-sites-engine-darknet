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
                q: request.nextUrl.searchParams.get('q') as string,

                domain: request.nextUrl.searchParams.get('domain') as string,

                offset: request.nextUrl.searchParams.get('offset') as string,
                count: request.nextUrl.searchParams.get('count') as string,
            }

            //схема
            const schema = Joi.object({
                q: Joi.string().min(3).max(255).allow(null).empty('').default(null),

                domain: Joi.any().valid('adnl', 'ton', 'onion').allow(null).empty('').default(null),

                offset: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(0),
                count: Joi.number().integer().min(0).max(2000).allow(null).empty('').default(20),
            })
            value = await schema.validateAsync(url)
        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }

        try {
            await mongo()

            let arFields = {
                q: value.q,

                module: value.module,

                offset: value.offset,
                count: value.count
            }

            let items = await CSite.Get ( arFields )
            let count = await CSite.GetCount ( arFields )

            return NextResponse.json({
                code: 0,
                response: {
                    count: count,
                    items: items
                }
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
