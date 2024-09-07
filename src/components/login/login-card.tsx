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
      <Card className="mx-auto max-w-md bg-zinc-900 text-zinc-100 border-zinc-700">
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
            <Button type="submit" variant={"login_button"}>
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
