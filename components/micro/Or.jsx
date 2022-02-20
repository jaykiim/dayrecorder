function Or({ bg }) {
  return (
    <div className="relative my-8 w-full bg-gray-300" style={{ height: '1px' }}>
      <p
        className={`absolute -top-2 left-1/2 flex -translate-x-1/2 justify-center ${bg} px-4 text-xs text-gray-300`}
      >
        또는
      </p>
    </div>
  )
}

export default Or
