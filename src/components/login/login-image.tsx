import Image from "next/image";
import { PanelsTopLeft } from "lucide-react";

export default function Loginimage() {
  return (
    <>
      <Image
        src="/bg-login.jpg" // Substitua pelo caminho correto da imagem
        alt="Background Image"
        fill
        style={{ objectFit: "cover" }}
        className="p-2 rounded-3xl"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
      <div className="relative h-full w-full flex flex-col">
        <div className="absolute top-0 inset-x-0 flex items-start justify-start p-10 text-zinc-100">
          <PanelsTopLeft className="w-6 h-6 mr-1" />
          <h1 className="font-bold text-lg whitespace-nowrap">Projeto</h1>
        </div>
        <div className="absolute bottom-0 inset-x-0 flex items-center justify-center p-10 text-zinc-100">
          <div>
            <p>
              &quot;Transformando visões em realidade, um projeto de cada
              vez.&quot;
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
