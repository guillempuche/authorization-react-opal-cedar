import { useGlobalStateContext } from '../global_state'
import { QuoteItem } from './quote_item'

export const ContentArea = () => {
  const { quotes } = useGlobalStateContext()
  return (
    <div className="flex-1 flex-col overflow-auto rounded-2xl space-y-4 bg-gray-900 p-5 pb-24">
      {quotes.length > 0 ? (
        <div className="flex flex-col space-y-2">
          {quotes.map((quote, index) => (
            <QuoteItem key={index} quote={quote} />
          ))}
        </div>
      ) : (
        <div className="grow flex justify-center items-center rounded-3xl p-6">
          <div className="text-center dark:text-white">
            No quotes available.
          </div>
        </div>
      )}
    </div>
  )
}
