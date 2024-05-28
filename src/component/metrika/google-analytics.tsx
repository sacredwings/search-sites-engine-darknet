// @ts-nocheck
'use client'
import config from "../../../config.json";
import ReactGA from "react-ga4"
ReactGA.initialize(config.google.metrika)

export default function GoogleAnalytics () {
    return <></>
}
