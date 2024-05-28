import style from './style.module.sass'
import SiteAdd from '@/component/site/add'
import SiteList from '@/component/site/list'
import {ServerSiteGet} from "@/component/function/url_api";
import {cookies} from "next/headers";

export default async function Home({
    params,
    searchParams
}: {
    params: {},
    searchParams: { page: number, q: string, domain: string }
}) {

    const url = `/`
    const step = 20
    const page = searchParams.page ? (Number(searchParams.page) - 1) * step : 0

    let siteList = await ServerSiteGet({
        q: searchParams.q,

        domain: searchParams.domain,

        count: step,
        offset: page
    },{cookies: cookies()})

  return (
      <main className={'container'} style={{maxWidth: '540px'}}>
          <div className={style.page}>

              <div className={style.header}>
                  <h1 className={style.h1}>Search sites engine darknet Ton | Tor</h1>
                  <h2>Site Statistics Status</h2>
              </div>

              <div className={style.status}>
                  <div>
                      <p>.ton</p>
                      <span className="badge text-bg-warning">1</span>
                  </div>
                  <div>
                      <p>.adnl</p>
                      <span className="badge text-bg-warning">2</span>
                  </div>
                  <div>
                      <p>.onion</p>
                      <span className="badge text-bg-warning">3</span>
                  </div>
              </div>

              <ul className="nav nav-tabs">
                  <li className="nav-item">
                      <a className="nav-link active" href="#">all</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#">ton</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#">adnl</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#">onion</a>
                  </li>
              </ul>

              <SiteList list={siteList}/>
          </div>

      </main>
  );
}
