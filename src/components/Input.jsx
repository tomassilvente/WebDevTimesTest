import {  useState } from "react"
import { getNews } from "../services/getNews"
import { NewsCard } from "./NewsCard"
import {dummyData} from "../../DummyData/data.json" 

export const Input = () => {

    const [query, setQuery] = useState('Donald')   
    const [result, setResult] = useState(dummyData)
    const [filter, setFilter] = useState()

    const handleQuery = (value) =>{
        setQuery(value)
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await getNews(query)
        if(response) setResult(response)
    }
    
    const handleFilter = (e) => {
        e.preventDefault();
        let sortedResults = [...result]; // Hacer una copia del array original
    
        if (filter === 'date') {
            sortedResults.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        } else if (filter === 'category') {
            sortedResults.sort((a, b) => a.category.localeCompare(b.category));
        } else if (filter === 'source') {
            sortedResults.sort((a, b) => a.by.localeCompare(b.by));
        }
    
        // Actualizar el estado con los resultados ordenados
        setResult(sortedResults);
    };
    

  return (
    <div className="mt-10">
        <form onSubmit={handleSubmit} className="lg:px-16 lg:flex justify-center text-center">
            <p className="text-2xl lg:text-3xl">Search News</p>
            <input className="rounded-xl text-2xl md:ml-6 text-black px-5 my-5 lg:my-0 " onChange={e => handleQuery(e.target.value)} type="text" value={query}/>
            <button className="bg-blue-700 md:px-4 pb-1 pt-2 rounded-xl text-lg ml-2 w-[100px] " type="submit">Search</button>
        </form>
        {result != 0   
                ?   
                    <>
                        <form onSubmit={handleFilter} className="mt-8 ml-10">
                            <span>Filter By</span>
                            <select onChange={e => setFilter(e.target.value)} className="bg-white text-black ml-3">
                                <option value='source' > Source </option>
                                <option value='category'> Category </option>
                                <option value='date'> Date </option>
                            </select>
                            <button className="py-[2px] px-3 ml-3 rounded-lg text-xs bg-blue-600" type="submit">GO!</button>
                        </form>
                        <div className="grid lg:grid-cols-2 m-10 rounded-lg bg-[#adadad2b]">
                            {
                                result?.map(news =>(
                                    <NewsCard by={news.by} key={news.key} author={news.author} description={news.description} publishedAt={news.publishedAt} url={news.url} title={news.title} image={news.image? news.image : ''}/>
                            ))
                            
                            }
                        </div>
                </>
                : <p className="text-center">No News Found related with {query}</p> 
        }
    </div>
  )
}
