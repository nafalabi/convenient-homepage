import {
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { ChevronRight, ExpandMore, Notes } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import useFetchNoteList from "./hooks/useFetchNoteList";
import { actions } from "./slice";
import InputWithConfirmation from "../../components/InputWithConfirmation";
import { db, Note } from "../../app/storage/Dexie";
import { Skeleton, TreeItem, TreeView } from "@material-ui/lab";
import useFetchExpandedNoteIds from "./hooks/useFetchExpandedNoteIds";

const Sidebar = () => {
  const [expandedNoteIds, setExpandedNoteIds] = useFetchExpandedNoteIds();
  const noteList = useFetchNoteList(expandedNoteIds);
  const dispatch = useDispatch();

  const toggleExpandNode = (e, ids) => {
    const idToBeExpanded = ids.find((id) => !expandedNoteIds.includes(id));
    const idToBeShrinked = expandedNoteIds.find((id) => !ids.includes(id));
    if (idToBeExpanded) {
      db.note
        .update(parseInt(idToBeExpanded), { expanded: 1 })
        .then((a) => console.log(a));
    }
    if (idToBeShrinked) {
      db.note
        .update(parseInt(idToBeShrinked), { expanded: 0 })
        .then((a) => console.log(a));
    }
    setExpandedNoteIds(ids);
  };

  const mapList = (arrayList) => {
    return arrayList.map((note) => {
      if (note.totalChildren > 0) {
        return (
          <TreeItem
            key={note.noteid}
            nodeId={String(note.noteid)}
            label={note.notename}
          >
            {note.children && mapList(note.children)}
            {!note.expanded && <LinearProgress />}
          </TreeItem>
        );
      }
      return (
        <TreeItem
          key={note.noteid}
          nodeId={String(note.noteid)}
          label={note.notename}
        />
      );
    });
  };

  return (
    <Box>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        expanded={expandedNoteIds}
        onNodeToggle={toggleExpandNode}
        onNodeSelect={(e, id) => dispatch(actions.selectNote(parseInt(id)))}
      >
        {mapList(noteList)}
      </TreeView>
    </Box>
  );

  // return (
  //   <Box>
  //     <List dense>
  //       {noteList.map((noteItem) => {
  //         return (
  //           <ListItem
  //             button
  //             key={noteItem.noteid}
  //             onClick={() => dispatch(actions.selectNote(noteItem.noteid))}
  //           >
  //             <ListItemIcon>
  //               <Notes />
  //             </ListItemIcon>
  //             <ListItemText>{noteItem.notename}</ListItemText>
  //           </ListItem>
  //         );
  //       })}
  //       <ListItem>
  //         <InputWithConfirmation
  //           onConfirm={(value) => {
  //             const newNote = new Note();
  //             newNote.notename = value;
  //             newNote.save();
  //           }}
  //           inputProps={{ style: { fontSize: 13 } }}
  //           placeholder="Add New Note"
  //         />
  //       </ListItem>
  //     </List>
  //   </Box>
  // );
};

export default Sidebar;
