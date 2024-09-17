import { Player } from '@lottiefiles/react-lottie-player'

export const ReportProcessingView = () => (
  <>
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center max-w-xl">
        <div>
          <Player
            autoplay
            loop
            src="/animation-2.json"
            style={{ height: '150px', width: '300px' }}
          ></Player>
        </div>
        <h1 className="mt-4 text-2xl text-center font-bold text-gray-900">
          We are working on your analysis. It might take a while.
        </h1>
        <p className="mt-2 max-w-4xl text-md text-center text-gray-700">
          Fetching data from your repositories and analyzing it. This might take
          a while. You can check the status of your report on the Integrations
          page.
        </p>

        <p className="mt-2 max-w-4xl text-md text-center text-gray-700">
          We will notify you once the integration and report are ready.
        </p>
      </div>
    </div>
  </>
)
