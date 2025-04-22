import { useQuery } from "@tanstack/react-query";
import { User, UserCard } from "../UserCard/UserCard";
import { useNavigate } from "@tanstack/react-router";

export function UsersList() {
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["usersData"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then(async (res) => {
        const response = await res.json();
        const users: User[] = response.map((apiUser) => {
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
        });

        return users;
      }),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((user) => (
        <UserCard
          user={user}
          key={user.id}
          onClick={() => navigate({ to: `/users/${user.id}` })}
        />
      ))}
    </div>
  );
}
