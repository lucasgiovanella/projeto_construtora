import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Logincard() {
  return (
    <>
      <Card className="max-w-md bg-zinc-900 text-zinc-100 border-zinc-700 backdrop-blur-md bg-opacity-90">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Insira suas credenciais para acessar o sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                required
                className="bg-white text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                className="bg-white text-black"
                required
              />
            </div>
            <Button className="bg-[#3d727f] hover:bg-[#3d737f]/90 text-white w-full">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
