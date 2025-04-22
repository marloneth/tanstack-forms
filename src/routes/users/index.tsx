import { createFileRoute } from "@tanstack/react-router";
import { UserForm } from "../../components/UserForm/UserForm";

export const Route = createFileRoute("/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserForm />;
}
