import {
  LockClosedIcon,
  LockOpenIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

import { useGlobalStateContext } from '../global_state'
import { IQuote } from '../types'

interface QuoteItemProps {
  quote: IQuote
}

export const QuoteItem = ({ quote }: QuoteItemProps) => {
  const { user } = useGlobalStateContext()
  return (
    <div className="flex items-center justify-between p-6 border border-gray-700 rounded-2xl bg-gray-800 hover:bg-gray-700">
      <div className="mr-4">
        <span className="text-white text-lg block">
          "{quote.text}" <em className="text-gray-300">{quote.author}</em>
        </span>
        {quote.creator === user && (
          <span className="block mt-5 text-md text-blue-300">
            Your quote ({quote.creator})
          </span>
        )}
      </div>
      <div className="flex flex-col items-center space-y-2">
        <button
          onClick={() => { }}
          className=" hover:bg-gray-600 p-2 rounded-full transition duration-200 ease-in-out"
          title={
            quote.private
              ? 'Private: only the owner can update and delete'
              : 'Public: all users can view'
          }
        >
          {quote.private ? (
            <LockClosedIcon className="h-5 w-5 text-red-500 hover:text-red-400" />
          ) : (
            <LockOpenIcon className="h-5 w-5 text-green-500 hover:text-green-400" />
          )}
        </button>
        <button
          onClick={() => { }}
          className="hover:bg-gray-600 p-2 rounded-full transition duration-200 ease-in-out"
          title="Delete quote"
        >
          <TrashIcon className="h-5 w-5 text-white hover:text-gray-400" />{' '}
        </button>
      </div>
    </div>
  )
}
