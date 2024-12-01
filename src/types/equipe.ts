export interface TeamMember {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    senha?: string;  // Optional since we don't always need to show it
}