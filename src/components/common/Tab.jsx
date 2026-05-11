export default function Tab({ tabData, field, setField }) {
  return (
    <div
      style={{
        boxShadow:
          "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex p-1 my-6 border rounded-full max-w-max gap-x-1 border-richblack-700 bg-richblack-800"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
            field === tab.type
              ? "bg-yellow-50 text-black"
              : "bg-transparent text-white"
          }`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  )
}