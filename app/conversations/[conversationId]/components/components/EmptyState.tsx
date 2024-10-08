const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-screen flex justify-center items-center bg-gray-100 dark:bg-[#0F172A]">
      <div className="text-center items-center flex flex-col">
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};
export default EmptyState;
