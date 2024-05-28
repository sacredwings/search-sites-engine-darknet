// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import EditorLite from "@/component/editorLite2";
import Styles from "./style.module.sass";
import MinioFileViewer from "@/component/file/viewer";
import Link from "next/link";
import {DateFormat} from "@/utility/time";
import {ServerPostDelete, ServerPostEdit} from "@/component/function/url_api";
import style from "./style.module.sass";
import LikeElement from "@/component/like/element";

export default function SiteElement ({element}) {
    let [form, setForm] = useState(element)

    return (
        <>
            <h1 className="card-title">{form.title}</h1>
            <p className="card-text">{form.description}</p>
            <p className={style.create_date}>{DateFormat(form.create_date)}</p>
            <a href="#" className="card-link">{form.domain_address}.{form.domain}</a>

        </>

    )
}
