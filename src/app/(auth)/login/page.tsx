import Logincard from "@/components/login/login-card";
import Loginimage from "@/components/login/login-image";

export default function LoginPage() {
  return (
    <div className="flex w-full">
      <div className="relative w-1/2 h-screen">
        <Loginimage />
      </div>
      <div className="w-1/2 flex flex-col justify-center p-12">
        <Logincard />
      </div>
    </div>
  );
}
