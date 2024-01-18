import { useEffect } from 'react'
import { useGlobalStateContext } from '../global_state'
import { useFetchUserQuotes } from '../hooks'

export const TopBar = () => {
  const { user, setUser } = useGlobalStateContext()
  const fetchQuotes = useFetchUserQuotes()

  // Fetch quotes whenever the user changes
  useEffect(() => {
    fetchQuotes()
  }, [user, fetchQuotes])

  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center">
        <label className="mr-2 text-gray-700 dark:text-gray-300">
          Fake login as
        </label>
        <select
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="p-2 rounded-xl border bg-white dark:bg-black text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="visitor">visitor</option>
          <option value="miquel">miquel</option>
          <option value="carla">carla</option>
        </select>
      </div>
      <button
        onClick={() => fetchQuotes()}
        className="px-4 py-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-700 transition duration-300"
      >
        Fetch quotes
      </button>
    </div>
  )
}
