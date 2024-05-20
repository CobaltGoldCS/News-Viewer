import { parseString } from 'xml2js';

export enum Source {
    NASA,
    NewYorkTimes,
    TheVerge,
}

export interface ArticleInfo {
    title: string,

    content: string,

    source: Source,
}

export async function consumeVerge(): Promise<ArticleInfo[]> {
    let data = await (await fetch('https://www.theverge.com/rss/index.xml')).text();
    
    let json: any;

    parseString(data, (err, result) => {
        if (!err) {
            json = result;
        } else {
            throw new Error(`Verge RSS Url failed: ${err}\n Data Was: ${data}`);
        }
    });

    let items = json!.feed.entry;

    let processed: ArticleInfo[] = [];

    for (let item of items) {
        let info: ArticleInfo = {
            title: item["title"],
            content: item["content"][0]["_"].replace("\\n", "\n"),
            source: Source.TheVerge,
        } 

        processed.push(info);
    }

    return processed;
}

export async function consumeNYT(): Promise<ArticleInfo[]> {
    let data = await (await fetch('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml')).text();
    
    let json: any;

    parseString(data, (err, result) => {
        if (!err) {
            json = result;
        } else {
            throw new Error(`NYT RSS Url failed: ${err}\n Data Was: ${data}`);
        }
    });

    console.log(json);

    let items = json!.rss.channel[0].item;

    let processed: ArticleInfo[] = [];


    for (let item of items) {
        let info: ArticleInfo = {
            title: item["title"],
            content: item["description"],
            source: Source.NewYorkTimes,
        } 

        processed.push(info);
    }

    return processed;
}

export async function consumeNASA(): Promise<ArticleInfo[]> {

    let data = await (await fetch('https://www.nasa.gov/feed/')).text();
    
    let json: any;

    parseString(data, (err, result) => {
        if (!err) {
            json = result;
        } else {
            throw new Error(`NYT RSS Url failed: ${err}\n Data Was: ${data}`);
        }
    });

    console.log(json);

    let items = json!.rss.channel[0].item;

    let processed: ArticleInfo[] = [];


    for (let item of items) {
        let info: ArticleInfo = {
            title: item["title"],
            content: item["content:encoded"][0],
            source: Source.NASA,
        } 

        processed.push(info);
    }

    return processed;
}