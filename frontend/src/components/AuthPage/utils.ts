export const authErrorMessages: { [prop: string]: string } = {
  email_already_exists: "User with this email already exists",
  incorrect_email_or_password: "Incorrect email or password",
  // user_does_not_exist: "User with this email doesn't exist",
};

export function getAuthErrorMessage(shortError: string) {
  return authErrorMessages[shortError] || "Something went wrong";
}
