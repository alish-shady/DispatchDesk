import Home from "@/components/layout/Home";
import { signupAction } from "./actions";

export default function Page() {
  return (
    <Home>
      <form action={signupAction} className="grid grid-cols-1">
        <input name="orgName" type="text" placeholder="org name" />
        <input name="name" type="text" placeholder="name" />
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">sign up</button>
      </form>
    </Home>
  );
}
