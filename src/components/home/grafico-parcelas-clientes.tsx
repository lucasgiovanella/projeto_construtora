import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Client {
  name: string;
  amountToPay: number;
}

const ClientCard: React.FC = () => {
  // Geração de 10 clientes fictícios
  const clients: Client[] = Array.from({ length: 10 }, (_, i) => ({
    name: `Cliente ${i + 1}`,
    amountToPay: Math.random() * 1000 + 100, // Valores entre $100 e $1100
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Clientes com Pendências</CardTitle>
        <CardDescription>
          Mostrando clientes com montantes a pagar
        </CardDescription>
      </CardHeader>
      <CardContent>
        {clients.map((client, index) => (
          <React.Fragment key={index}>
            <div className="flex gap-4 items-center py-2">
              <p>{client.name}</p>
              <p>A pagar: ${client.amountToPay.toFixed(2)}</p>
            </div>
            {index < clients.length - 1 && <hr />}{" "}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default ClientCard;
