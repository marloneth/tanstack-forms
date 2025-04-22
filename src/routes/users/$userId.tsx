import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { UserForm } from "../../components/UserForm/UserForm";

export const Route = createFileRoute("/users/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = useParams({ from: "/users/$userId" });
  const { isPending, error, data } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
        async (res) => {
          const response = await res.json();
          const apiUser = response;
          const { id, username, email, phone, website } = apiUser;
          const [firstName, lastName] = apiUser.name.split(" ");

          return {
            id,
            firstName,
            lastName,
            username,
            email,
            password: website,
            phoneNumber: phone,
          };
        }
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <UserForm user={data} />;
}
