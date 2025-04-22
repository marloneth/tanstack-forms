import { useQuery } from "@tanstack/react-query";
import { User, UserCard } from "../UserCard/UserCard";

export function UsersList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then(async (res) => {
        console.log("FETCHING... ");
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
    <div
      className="grid grid-cols-2 gap-4"
      // onClick={() => navigate({ to: `/user/${user.id}` })}
    >
      {data.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
}
