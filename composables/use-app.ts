export const useApp = () => {
  const search = useState("app-search", () => "");
  const limit = 10;
  const formatDate = "dd/MM/yyyy";
  const formatTime = "hh:ss";
  const formatDateTime = `${formatDate} ${formatTime}`;

  return {
    search,
    limit,
    formatDate,
    formatTime,
    formatDateTime,
  };
};
