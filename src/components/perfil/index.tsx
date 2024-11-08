"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";

export default function UserProfile() {
  const user = useAuth((state) => state.user);

  const [newPassword, setNewPassword] = useState("");
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setNewProfileImage(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  // const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let newUsername = e.target.value;
  //   if (!newUsername.startsWith("@")) {
  //     newUsername = "@" + newUsername;
  //   }
  //   setUser({ ...user, username: newUsername });
  // };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Here you would typically send the updated user data to your backend
  //   const updatedUser = { ...user };
  //   if (newProfileImage) {
  //     updatedUser.profileImage = URL.createObjectURL(newProfileImage);
  //   }
  //   setUser(updatedUser);
  //   console.log("Updated user data:", updatedUser);
  //   console.log("New password:", newPassword);
  //   // Reset the newPassword and newProfileImage states after saving
  //   setNewPassword("");
  //   setNewProfileImage(null);
  // };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full rounded max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Perfil de usuário</CardTitle>
          <CardDescription>
            Visualize e edite suas infomrçaões de usuário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="edit">Editar perfil</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-24 h-24">
                  {/* <AvatarImage src={user.profileImage} alt={user.name} /> */}
                  <AvatarFallback>
                    {user?.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{user?.nome}</h2>
                  {/* <p className="text-gray-500">{user?.cargo}</p> */}
                  <p className="text-gray-500">
                    {user !== null &&
                      user.cargo.charAt(0).toUpperCase() + user.cargo.slice(1)}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="edit">
              <form onSubmit={() => {}} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Email</Label>
                  <Input
                    id="email"
                    value={user?.email}
                    // onChange={handleUsernameChange}
                    placeholder="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Nova senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Insira uma nova senha"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Imagem de perfil</Label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                      isDragActive ? "border-primary" : "border-gray-300"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {newProfileImage ? (
                      <div className="flex flex-col items-center">
                        <Image
                          src={URL.createObjectURL(newProfileImage)}
                          alt="Nova imagem de perfil"
                          width={32}
                          height={32}
                          className="w-32 h-32 object-cover rounded-full mb-2"
                        />
                        <p>Clique ou arraste para mudar a imagem</p>
                      </div>
                    ) : isDragActive ? (
                      <p>Solte a imagem aqui ...</p>
                    ) : (
                      <p>
                        Arraste e solte uma imagem aqui, ou clique para
                        selecionar uma
                      </p>
                    )}
                  </div>
                  <div className="flex w-full justify-end">
                    <Button type="submit">Salvar</Button>
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
