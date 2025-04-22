import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersList } from "./components/UsersList/UsersList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersList />
    </QueryClientProvider>
  );
}

export default App;
