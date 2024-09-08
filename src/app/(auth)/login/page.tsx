import Logincard from "@/components/login/login-card";
import Loginimage from "@/components/login/login-image";

export default function LoginPage() {
  return (
    <div className="relative flex flex-col md:flex-row w-full max-h-screen">
      <div className="relative w-full md:w-1/2 h-full">
        <Loginimage />
      </div>
      <div className="absolute inset-0 md:relative md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <Logincard />
      </div>
    </div>
  );
}
