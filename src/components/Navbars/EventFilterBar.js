const EventFilterBar = () => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <div className="flex flex-1 flex-row">
        {/* Search Input */}
        <div className="flex flex-1 flex-col items-start">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search Events"
            className="w-full rounded-l-lg border px-3 py-2 text-black"
          />
        </div>
        {/* Location Input */}
        <div className="flex max-w-[150px] flex-1 items-start">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            className="w-full rounded-r-lg border px-3 py-2 text-black"
          />
        </div>
      </div>
      {/* Radius Selector */}
      <div className="flex max-w-[120px] flex-1 items-start">
        <input
          type="number"
          id="radius"
          name="radius"
          min="1"
          max="100"
          defaultValue="10"
          className="w-full rounded-lg border px-3 py-2 text-black"
        />
      </div>
    </div>
  );
};

export default EventFilterBar;
