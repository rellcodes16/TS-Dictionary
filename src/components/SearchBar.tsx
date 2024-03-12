import { useData } from "../context/DataContext";

function SearchBar() {

  const { query, handleChange, handleSearch } = useData()
    
  return (
    <div className="flex justify-center">
        <input value={query} onChange={handleChange} type="text" className="border p-1 border-gray-500 rounded-md border-solid w-[300px]"/>
        <button onClick={handleSearch} className="bg-indigo-600 text-gray-300 rounded-full py-2 px-4 ml-2">Search</button>
    </div>
  )
}

export default SearchBar