// @ts-nocheck
'use client'

import React, {useEffect, useState} from "react";
import {ServerPostGetById, ServerSiteAdd} from "@/component/function/url_api";
import Modal from '@/component/modal/default'

export default function Add ({ElementAdd}) {
    let [visible, setVisible] = useState(false)

    let formDefault = {
        title: '',
        description: '',

        domain: 'ton',
        domain_address: ''
    }
    let [form, setForm] = useState(formDefault)

    const handleButton = () => {
        setVisible(!visible)
    }

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const onChangeDomain = (value) => {
        setForm(prev => ({
            ...prev, domain: value
        }))
    }

    const onAdd = async () => {

        let arFields = {
            title: form.title,
            description: form.description,

            domain: form.domain,
            domain_address: form.domain_address,
        }

        let result = await ServerSiteAdd(arFields)

        setForm(formDefault)
        handleButton()
    }

    const Content = () => {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
            }}>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" onChange={onChangeText} value={form.title}
                           placeholder=""/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="3" onChange={onChangeText}
                              value={form.description}></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Domain</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" id="domain_address" aria-label="Domain" onChange={onChangeText}
                               value={form.domain_address}/>
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">{form.domain ? `.${form.domain}` : 'select domain'}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="#" onClick={() => {
                                onChangeDomain('ton')
                            }}>.ton</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => {
                                onChangeDomain('adnl')
                            }}>.adnl</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => {
                                onChangeDomain('onion')
                            }}>.onion</a></li>
                        </ul>
                    </div>
                </div>


                <button type="button" className="btn btn-secondary" onClick={handleButton}>
                    Close
                </button>
                &nbsp;
                <button type="button" className="btn btn-success" onClick={onAdd}>
                    Add
                </button>
            </form>
        )
    }

    return (
        <>
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="button" onClick={handleButton}>Add site</button>
            </div>

            {visible ? <Modal Close={handleButton} title={'Add site'}>
                {Content()}
            </Modal> : null}
        </>
    )
}
