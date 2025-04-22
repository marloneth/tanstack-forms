import { createFileRoute } from "@tanstack/react-router";
import { UsersList } from "../components/UsersList/UsersList";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <UsersList />;
}
