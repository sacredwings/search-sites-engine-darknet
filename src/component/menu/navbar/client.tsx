// @ts-nocheck
'use client'
import {useEffect, useState} from "react";

import {loadReCaptcha} from "recaptcha-v3-react-function-async"
import config from '../../../../config.json'

export default function Navbar ({}) {

    useEffect(() => {
        (async () => {
            typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null

            //установка reCaptcha
            loadReCaptcha(
                config.google.reCaptcha.public,
            )
                .then(() => {
                    console.log('ReCaptcha loaded')
                })
                .catch((e) => {
                    console.error('Error when load ReCaptcha', e)
                })
        })()

    }, [])


    return (
        <div>
        </div>
    )
}
