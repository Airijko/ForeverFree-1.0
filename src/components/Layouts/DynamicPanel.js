const DynamicPanel = ({ children }) => {
  return (
    <aside className="hidden flex-col items-center gap-4 p-5 lg:inline">
      {children}
    </aside>
  );
};

export default DynamicPanel;
