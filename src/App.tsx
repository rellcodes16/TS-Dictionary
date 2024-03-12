import AppLayout from "./components/AppLayout"
import { DataProvider } from "./context/DataContext"

function App() {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <DataProvider>
        <AppLayout />
      </DataProvider>
    </div>
  )
}

export default App