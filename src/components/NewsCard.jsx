
export const NewsCard = ({author, description, publishedAt, url, title, by, image}) => {
  return (
    <a href={url} target="_blank" className="mt-4 p-5 w-[90%]  rounded-xl space-y-5 bg">
        <p className="md:px-10 xl:px-18 text-3xl text-center font-bold text-blue-200">{title}</p>
        <div className="flex justify-around space-x-4 text-center text-gray-300">
            <p>{author}</p>
            <p>Published {publishedAt.toString().slice(0,10)}</p>
        </div>
        <div className="flex justify-center">
        {
          image != 'undefined' && image &&
          <img className="w-[400px] h-[250px]" src={image} />
        }
        </div>
        <p className="text-center">{description}</p>
        <p className="text-xs font-light text-blue-200">{by}</p>
        <hr />
    </a>
  )
}
