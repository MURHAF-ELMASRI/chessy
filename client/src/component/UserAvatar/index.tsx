import accountCircle from "@iconify-icons/mdi/account-circle";
import { Avatar } from "@material-ui/core";
import { InlineIcon } from "@iconify/react";

interface Props {
  photoURL: string | null;
  displayName: string | null;
}

const UserAvatar: React.FC<Props> = ({ photoURL, displayName }) => {
  return photoURL ? (
    <Avatar alt={displayName!} src={photoURL} />
  ) : (
    <InlineIcon width={40} icon={accountCircle} />
  );
};

export default UserAvatar;
