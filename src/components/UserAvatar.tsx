import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
};

const UserAvatar = ({ name }: Props) => {
  const generateInitials = (username: string): string => {
    const parts = username.trim().split(/[\s-_]+/);

    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    return username.slice(0, 2).toUpperCase();
  };
  return (
    <Avatar className="h-9 w-9">
      <AvatarImage src="" />
      <AvatarFallback>{generateInitials(name)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
