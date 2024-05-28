// @ts-nocheck
'use client'

import React, {useEffect, useState} from "react";
import style from "./style.module.sass";
import SiteAdd from "@/component/site/add";
import SiteElement from "@/component/site/element";

export default function SiteList ({list}) {
    let [clientList, setClientList] = useState(list)

    return <div className={style.cardContainer}>

        <SiteAdd />

        {clientList.items.map((item, i) => {
            return <article key={item._id} className={style.card}>
                <SiteElement
                    element={item}
                />
            </article>
        })}

    </div>

}
