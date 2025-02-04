"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShieldAlert,
  MoreVertical,
  User,
  Mail,
  Car,
  PenTool,
  Copy,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import /*  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger, */
"@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialogs";
import { Badge } from "@/components/ui/badge";
import { useToast, ToastAction, ToastProvider } from "@/components/ui/toast";

interface User {
  id: string;
  name: string;
  email: string;
  role:
    | "admin"
    | "manager"
    | "editor"
    | "viewer"
    | "driver"
    | "blogger"
    | "customer";
  avatar: string;
  status: "active" | "inactive";
  lastActive: string;
}

const roles = {
  admin: {
    label: "Administrador Total",
    description: "Acceso completo a todas las funciones del sistema",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: <ShieldAlert className="w-4 h-4 text-red-600" />,
  },
  driver: {
    label: "Chofer",
    description: "Puede gestionar sus viajes y perfil",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: <Car className="w-4 h-4 text-green-600" />,
  },
  blogger: {
    label: "Escritor de Blog",
    description: "Puede crear y editar contenido del blog",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: <PenTool className="w-4 h-4 text-blue-600" />,
  },
  customer: {
    label: "Cliente",
    description: "Puede reservar viajes y gestionar su perfil",
    badge:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    icon: <User className="w-4 h-4 text-yellow-600" />,
  },
  manager: {
    label: "Manager",
    description: "Puede gestionar usuarios y permisos",
    badge:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    icon: <User className="w-4 h-4 text-purple-600" />,
  },
  editor: {
    label: "Editor",
    description: "Puede editar contenido",
    badge:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: <PenTool className="w-4 h-4 text-orange-600" />,
  },
  viewer: {
    label: "Viewer",
    description: "Puede ver contenido",
    badge: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    icon: <User className="w-4 h-4 text-gray-600" />,
  },
};

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (scrolledToBottom) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMoreUsers = () => {
    // Simulating API call to load more users
    const newUsers = Array.from({ length: 20 }, (_, i) => ({
      id: `${users.length + i + 1}`,
      name: `Usuario ${users.length + i + 1}`,
      email: `usuario${users.length + i + 1}@choferconnect.com`,
      role: ["admin", "driver", "blogger", "customer"][
        Math.floor(Math.random() * 4)
      ] as User["role"],
      avatar: "/placeholder.svg?height=40&width=40",
      status: Math.random() > 0.2 ? ("active" as const) : ("inactive" as const),
      lastActive: new Date(Date.now() - Math.random() * 10).toISOString(),
    }));
    setUsers((prevUsers) => [...prevUsers, ...newUsers]);
    setPage((prevPage) => prevPage + 1);
    setHasMore(page < 5); // Limit to 5 pages for this example
  };

  useEffect(() => {
    if (isNearBottom && hasMore) {
      loadMoreUsers();
    }
  }, [isNearBottom, hasMore, loadMoreUsers]);

  useEffect(() => {
    loadMoreUsers(); // Load initial users
  }, [loadMoreUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRoleChange = (newRole: User["role"]) => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, role: newRole } : user
        )
      );
      setSelectedUser(null);
      toast({
        title: "Rol actualizado",
        description: `El rol de ${selectedUser.name} ha sido actualizado a ${roles[newRole].label}.`,
        action: <ToastAction altText="Cerrar">Cerrar</ToastAction>,
      });
    }
  };

  return (
    <ToastProvider>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestión de Permisos</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://choferconnect.com/register"
                  );
                  toast({
                    title: "Link copiado",
                    description:
                      "El enlace de registro ha sido copiado al portapapeles.",
                    action: <ToastAction altText="Cerrar">Cerrar</ToastAction>,
                  });
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                <DialogDescription>
                  Complete los detalles del nuevo usuario y asigne sus permisos.
                </DialogDescription>
              </DialogHeader>
              {/* Form content would go here */}
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole || ""} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                {Object.entries(roles).map(([value, { label }]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Mail className="w-4 h-4 mr-1" />
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {roles[user.role].icon}
                    <Badge className={`ml-2 ${roles[user.role].badge}`}>
                      {roles[user.role].label}
                    </Badge>
                  </div>
                  <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
                    className="hidden md:inline-flex"
                  >
                    {user.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                  <span className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
                    Último acceso: {formatDate(user.lastActive)}
                  </span>
                  <Dialog
                    open={!!selectedUser}
                    onOpenChange={() => setSelectedUser(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedUser(user)}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cambiar Rol de Usuario</DialogTitle>
                        <DialogDescription>
                          Seleccione el nuevo rol para {selectedUser?.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {Object.entries(roles).map(([key, { label, icon }]) => (
                          <Button
                            key={key}
                            variant="outline"
                            className="justify-start"
                            onClick={() =>
                              handleRoleChange(key as User["role"])
                            }
                          >
                            {icon}
                            <span className="ml-2">{label}</span>
                          </Button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            ))}
            {hasMore && (
              <div className="flex justify-center items-center p-4">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(roles).map(([key, { label, description, icon }]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                {icon}
                <h3 className="font-medium">{label}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </ToastProvider>
  );
}
