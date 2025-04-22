import { formOptions, useForm } from "@tanstack/react-form";
import { InputField } from "../InputField/InputField";
import { z } from "zod";
import { User } from "../UserCard/UserCard";

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zip: z.string(),
  apartmentNumber: z.string().optional(),
});

const userSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  username: z.string().nonempty(),
  password: z.string().min(8),
  email: z.string().email(),
  //addresses: z.array(addressSchema),
  phoneNumber: z.string().optional(),
});

export type UserFormFields = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User;
}

export function UserForm({ user }: UserFormProps) {
  const defaultUser: UserFormFields = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    username: user?.username ?? "",
    password: user?.password ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    //addresses: [],
  };

  const formOpts = formOptions({
    defaultValues: defaultUser,
    validators: {
      onChange: userSchema,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
    },
  });

  const form = useForm(formOpts);
  const isEditing = !!user;

  const getFieldError = (field) => {
    const { isTouched, errors } = field.state.meta;
    if (!isTouched || !errors.length) return;

    return errors.map((error) => error.message).join(",");
  };

  return (
    <form
      className="grid grid-cols-2 gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <p className="col-span-2">{isEditing ? "EDITING ..." : "CREATING ..."}</p>
      <form.Field name="firstName">
        {(field) => (
          <InputField
            id="user-first-name"
            name="firstName"
            textLabel="First Name"
            errorMessage={getFieldError(field)}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>
      <form.Field name="lastName">
        {(field) => (
          <InputField
            id="user-last-name"
            name="lastName"
            textLabel="Last Name"
            errorMessage={getFieldError(field)}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <InputField
            id="user-email"
            name="email"
            textLabel="Email"
            errorMessage={getFieldError(field)}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>
      <form.Field name="phoneNumber">
        {(field) => (
          <InputField
            id="user-phone-number"
            name="phoneNumber"
            textLabel="Phone Number"
            errorMessage={getFieldError(field)}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>
      <form.Field name="username">
        {(field) => (
          <InputField
            id="user-username"
            name="username"
            textLabel="Username"
            errorMessage={getFieldError(field)}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <InputField
            id="user-password"
            type="password"
            name="password"
            textLabel="Password"
            errorMessage={getFieldError(field)}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className="col-span-2 disabled:opacity-50"
          >
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      />
    </form>
  );
}
