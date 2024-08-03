

export default function Loading() {
  return (
    <div className=" bg-opacity-20 flex items-center justify-center">
        <div>
            <img src="/loading.svg" alt="Loading..." className="h-26 mt-[50%]" />
            <div className="text-blue-700 font-normal text-2xl flex items-center justify-center">Loading...</div>
        </div>
    </div>
  )
}
