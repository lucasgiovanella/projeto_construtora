import {
  Users,
  Building2,
  LayoutGrid,
  DollarSign,
  BarChart2,
  LucideIcon,
  Sheet,
  BookUser,
  Bookmark,
  Package,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home",
          label: "Home",
          active: pathname === "/home",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Financeiro",
      menus: [
        {
          href: "/financeiro",
          label: "Financeiro",
          active: pathname === "/financeiro",
          icon: DollarSign,
          submenus: [],
        },
        {
          href: "",
          label: "Tabelas",
          active: false,
          icon: Sheet,
          submenus: [
            {
              href: "/tabela/despesas",
              label: "Despesas",
              active: pathname.includes("/tabela/despesas"),
            },
            {
              href: "/tabela/entradas",
              label: "Entradas",
              active: pathname.includes("/tabela/entradas"),
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Gerência",
      menus: [
        {
          href: "/categorias",
          label: "Categorias",
          active: pathname.includes("/categorias"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/empreendimentos",
          label: "Empreendimentos",
          active: pathname.includes("/empreendimentos"),
          icon: Building2,
          submenus: [],
        },
        {
          href: "/fornecedores",
          label: "Fornecedores",
          active: pathname.includes("/fornecedores"),
          icon: Package,
          submenus: [],
        },
        {
          href: "/equipe",
          label: "Equipe",
          active: pathname.includes("/equipe"),
          icon: BookUser,
          submenus: [],
        },
      ],
    },

  ];
}
