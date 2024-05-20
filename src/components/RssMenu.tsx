import { useEffect, useState } from 'react';
import {ArticleInfo, consumeNASA, consumeNYT, consumeVerge, Source} from '../rssConsumers'
import '../App.css'

interface RssMenuProps {
    rssUrl: string
}

function RssMenu({rssUrl} : RssMenuProps) {

    const [elements, setElements] = useState<React.JSX.Element[] | null>(null);

    useEffect(() => {
        async function getContent() {

            let domain = (new URL(rssUrl)).hostname.replace('www.', '');

            let content: ArticleInfo[];
            switch (domain) {
                case 'theverge.com':
                    content = await consumeVerge();
                    break;

                case 'nytimes.com':
                    content = await consumeNYT();
                    break;

                case 'nasa.gov':
                    content = await consumeNASA();
                    break;
                default:
                    throw new Error("Unknown url");
            }
            
            let key = -1;

            let components = content.map(element => {
                key++;
                return <RssArticle title={element.title} content={element.content} source={element.source} key={key}/>
            });

            setElements(components);

        }
        getContent();
    }, [rssUrl])

    return (
        <div className='rss-menu'>
            {elements}
        </div>
    )
}



function RssArticle({title, content, source} : ArticleInfo) {

    let logo: string;

    switch (source) {
        case Source.NASA:
            logo = 'https://www.nasa.gov/wp-content/uploads/2023/04/nasa-logo-web-rgb.png';
            break;
        case Source.NewYorkTimes:
            logo = 'https://logos-world.net/wp-content/uploads/2020/11/The-New-York-Times-Logo-700x394.png';
            break;
        case Source.TheVerge:
            logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/The_Verge_logo.svg/885px-The_Verge_logo.svg.png';
            break;
    }

    return (
        <article className="rss-article">
            <img className="small-logo" src={logo} alt="Source Logo"></img>
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </article>
    )
}

export default RssMenu;