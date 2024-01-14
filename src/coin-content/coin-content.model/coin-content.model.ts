import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';
import {prop} from '@typegoose/typegoose';

export interface CoinContentModel extends Base {}
export class CoinContentModel extends TimeStamps{

    @prop({unique: true})
    idCoin: string

    @prop({unique: true})
    symbol: string

    @prop({type: () => [CoinContent]})
    data: CoinContent[]
}

export class CoinContent {

    @prop()
    id?: number

    @prop()
    title: string

    @prop({type: () => [CoinCard]})
    links: CoinCard[]

    @prop()
    text?: string

    @prop()
    default?: boolean

    @prop()
    alert?: boolean
}

class CoinCard {

    @prop()
    title: string

    @prop()
    id: number

    @prop()
    url: string

    @prop()
    thumbnailUrl: string

    @prop()
    desc?: string

    @prop()
    chart?: boolean //activate tradingview dialog

    @prop()
    symbol?:string

    @prop()
    menuActive?: boolean //activate menu, include urls

    @prop({type: () => [UrlsCard]})
    urls?: UrlsCard[]
}

class UrlsCard {

    @prop()
    title: string

    @prop()
    url: string
}


