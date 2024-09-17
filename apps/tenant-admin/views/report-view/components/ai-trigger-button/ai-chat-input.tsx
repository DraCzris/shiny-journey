type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const AIChatInput = ({ value, onChange, onSubmit }: Props) => (
  <form className="relative" onSubmit={onSubmit}>
    <input
      className="w-full bg-gray-100 text-gray-700 py-3 px-5 pr-12 rounded-full border-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
      placeholder="Say something..."
      value={value}
      onChange={onChange}
    />
    <span className="absolute right-4 h-full transform top-0 flex items-center text-gray-400 pointer-events-none">
      <svg
        className="size-4"
        fill="currentColor"
        strokeWidth="4px"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z"></path>
      </svg>
    </span>
  </form>
)
