// @ts-nocheck
'use client'

import { YMInitializer } from 'react-yandex-metrika';
import config from "../../../config.json";

export default function YandexMetrika () {
    return <YMInitializer accounts={[config.yandex.metrika]} options={{webvisor: true}} version="2" />
}