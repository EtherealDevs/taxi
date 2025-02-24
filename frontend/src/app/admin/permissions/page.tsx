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
import { Roles, Users, useUser } from "@/hooks/users";

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState<Roles[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [users, setUsers] = useState<Users[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const { getUsers, getRoles, update } = useUser();
  const fetchData = async () => {
    try {
      const response = await getUsers();
      const roles = await getRoles();
      setRoles(roles.roles);
      setUsers(response.users);
      setHasMore(false);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData();
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

  useEffect(() => {}, [isNearBottom, hasMore]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.roles[0].name === selectedRole;
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

  const handleRoleChange = async (newRole: Roles) => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, role: newRole } : user
        )
      );
      setSelectedUser(null);
      const formdata = new FormData();
      formdata.append("roles", String(newRole.id));
      await update(selectedUser.id, formdata);
      toast({
        title: "Rol actualizado",
        description: `El rol de ${selectedUser.name} ha sido actualizado a ${newRole.name}.`,
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
                {Object.entries(roles).map(([value, { name }]) => (
                  <SelectItem key={value} value={value}>
                    {name}
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
                    {/* <AvatarImage src={user} /> */}
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
                    {/* <Badge className={`ml-2 `}>{user.roles[0].name}</Badge> */}
                  </div>
                  {/* <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
                    className="hidden md:inline-flex"
                  >
                    {user.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                  <span className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
                    Último acceso: {formatDate(user.lastActive)}
                  </span> */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedUser(user)}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                  <Dialog
                    open={!!selectedUser}
                    onOpenChange={() => setSelectedUser(null)}
                  >
                    <DialogTrigger asChild></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cambiar Rol de Usuario</DialogTitle>
                        <DialogDescription>
                          Seleccione el nuevo rol para {selectedUser?.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {Object.entries(roles).map(([key, rol]) => (
                          <Button
                            key={key}
                            variant="outline"
                            className="justify-start"
                            onClick={() => handleRoleChange(rol)}
                          >
                            <span className="ml-2">{rol.name}</span>
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

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div> */}
      </div>
    </ToastProvider>
  );
}
