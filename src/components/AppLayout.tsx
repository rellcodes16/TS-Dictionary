import SearchBar from "./SearchBar"
import SearchDisplay from "./SearchDisplay"

function AppLayout() {
  return (
    <div className=" bg-slate-300 p-5 rounded-md border-[2px] min-w-[300px] min-h-[100px] border-dashed border-indigo-500">
        <SearchBar /> 
        <SearchDisplay />
    </div>
  )
}

export default AppLayout