import React from "react";
import { List } from "@material-ui/core";
import { User } from "src/types/User";
import ListElement from "./ListElement";

interface Props {
  allUsers: User[];
}

const UsersList: React.FC<Props> = ({ allUsers }) => {
  return (
    <List>
      {allUsers.map((e) => (
        <ListElement user={e} key={e.uid} />
      ))}
    </List>
  );
};

export default UsersList;
