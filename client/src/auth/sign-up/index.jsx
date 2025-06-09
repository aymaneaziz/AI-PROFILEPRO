import { SignIn, SignUp } from "@clerk/clerk-react";
import React from "react";

function SignUpPage() {
  return (
    <div className="flex justify-center my-20 items-center">
      <SignUp />
    </div>
  );
}
export default SignUpPage;
