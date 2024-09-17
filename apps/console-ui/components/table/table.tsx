type Props = {
  children: React.ReactNode
}

export const Table = ({ children }: Props) => (
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="mt-2 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-gray-800 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
)
