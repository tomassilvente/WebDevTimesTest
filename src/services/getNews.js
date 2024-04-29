export const getNews = async (query = 'Elon Musk') =>{

    let articles = []

    //New Api Fetching
    const NewsApiRes = await fetch(`https://newsapi.org/v2/top-headlines?q=${query}&from=2024-04-26&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`)
    const NewApiResponse = await NewsApiRes.json()
    const NewApiArticles = NewApiResponse.articles
   
    NewApiArticles?.slice(0,6).map(news =>(
        articles.push({by:'New Api Articles', key:news.title, author:news.author, description:news.description, publishedAt:news.publishedAt, url:news.url, title:news.title, category:news.category, image:news.urlToImage})
    ))

    //New York Times Fetching
    const NYTRes = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${import.meta.env.VITE_NYT_API_KEY}`)
    const NYTResponse = await NYTRes.json()
    const NYTArticles = NYTResponse.response.docs
    
    NYTArticles?.slice(0,6).map(news =>(
        articles.push({by:'New York Times',key:news.headline.main, author:news.byline.original, description:news.lead_paragraph, publishedAt:news.pub_date, url:news.web_url, title:news.headline.main, category:news.section_name, image:news.multimedia>0 ? news.multimedia[17].url : 'undefined'})
    ))

    //New York Times Fetching
    const GuardianaApisRes = await fetch(`https://content.guardianapis.com/search?q=${query}&from-date=2014-04-26&api-key=${import.meta.env.VITE_GUARDIANA_API_KEY}`)
    const GuardianaApisResponse = await GuardianaApisRes.json()
    const GuardianaArticles = GuardianaApisResponse.response.results
    
    GuardianaArticles?.slice(0,6).map(news =>(
        articles.push({by:'Guardiana', key:news.webTitle, author:'Guardiana', description:'Go to site!', publishedAt:news.webPublicationDate, url:news.webUrl, title:news.webTitle, category:news.sectionName})
    ))

    return articles
}