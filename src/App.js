import RssMenu from './components/RssMenu'
import Header from './components/Header'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <RssMenu rssUrl="https://theverge.com"/>
      <RssMenu rssUrl="https://nytimes.com"/>
      <RssMenu rssUrl='https://nasa.gov'/>
    </div>
  );
}

export default App;
