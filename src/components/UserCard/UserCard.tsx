import { UserFormFields } from "../UserForm/UserForm";

export interface User extends UserFormFields {
  id: string;
}

interface UserCardProps {
  user: User;
  onClick: () => void;
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div
      className="flex flex-col gap-2 border rounded-md p-4 cursor-pointer"
      onClick={onClick}
    >
      <p>
        <strong>Full Name: </strong> {user.firstName} {user.lastName}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      <p>
        <strong>Username: </strong>
        {user.username}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {user.phoneNumber ?? "Not added"}
      </p>
    </div>
  );
}
