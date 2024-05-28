export interface interfaceSiteAdd {
    image_id: string | null

    title: string
    description: string | null

    domain: 'adnl' | 'ton' | 'onion'
    domain_address: string

    gtoken?: string
}

export interface interfaceSiteGet {
    q: string | null

    domain: 'adnl' | 'ton' | 'onion' | null

    offset: number
    count: number
}

export interface interfaceSiteGetById {
    ids: string[]
}

export interface interfaceSiteCount {
    domain: 'adnl' | 'ton' | 'onion' | null
}
