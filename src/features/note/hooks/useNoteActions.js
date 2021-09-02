import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { db, Note } from "../../../app/storage/Dexie";
import NoteContent from "../../../app/storage/Dexie/NoteContent";
import useDebouncedCallback from "../../../hooks/useDebounceCallback";
import { actions } from "../slice";

const useNoteActions = (noteDetail) => {
  const dispatch = useDispatch();
  const [touched, setTouched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateNoteName = useCallback(
    (e) => {
      const { value } = e.target;
      if (!value) return;
      noteDetail.notename = value;
      noteDetail
        .save()
        .catch((e) => {
          console.log(e);
        })
        .then((a) => {
          dispatch(actions.refreshTreeList());
        });
    },
    [noteDetail, dispatch]
  );

  const updateNoteData = useCallback(
    useDebouncedCallback((getData) => {
      !touched && setTouched(true);
      !isSaving && setIsSaving(true);
      setTimeout(async () => {
        try {
          const data = getData();
          const noteContent = new NoteContent();
          noteContent.noteid = noteDetail.noteid;
          noteContent.notecontent = data;
          await noteContent.save();
        } catch (error) {
          console.log(error);
        }
        setIsSaving(false);
      }, 300);
    }, 1000),
    [noteDetail, touched, isSaving, setTouched, setIsSaving]
  );

  const onSearchLink = useCallback(async (term) => {
    const results = [];

    try {
      const notes = await db.note
        .where("notename")
        .startsWithIgnoreCase(String(term))
        .toArray();

      notes.forEach((note) => {
        results.push({
          title: note.notename,
          subtitle: note.parentnoteid ? `Sub Note` : `Root Note`,
          url: `/note?id=${note.noteid}`,
        });
      });
    } catch (e) {
      console.log(e);
    }

    return results;
  }, []);

  const addSubNote = useCallback(
    async (defaultNoteName = "sub note") => {
      // determining sub note name
      let index = 0;
      let notename = "";
      while (true) {
        notename = defaultNoteName;
        if (index > 0) notename = notename + " " + index;
        if (
          (await db.note
            .where(["parentnoteid", "notename"])
            .equals([noteDetail.noteid, notename])
            .count()) === 0
        ) {
          break;
        }
        index++;
      }

      let noteid = 0;
      try {
        const newNote = new Note();
        newNote.notename = notename;
        newNote.firstlevel = 0;
        newNote.parentnoteid = noteDetail.noteid;
        noteid = await newNote.save();
        const newNoteContent = new NoteContent();
        newNoteContent.noteid = noteid;
        newNoteContent.notecontent = `# ${notename}\n\n\\\n`;
        await newNoteContent.save();
      } catch (error) {
        console.log(error);
      }

      dispatch(actions.refreshTreeList());
      dispatch(actions.closeNoteListActionMenu());

      return `/note?id=${noteid}`;
    },
    [noteDetail, dispatch]
  );

  const uploadImage = useCallback(async (file) => {
    const imageDataBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return imageDataBase64;
  }, []);

  const onClickLink = useCallback(
    async (href) => {
      const match = href.match(/\/note\?id=(\d+)/);
      if (match) {
        const noteid = parseInt(match[1]);
        dispatch(actions.selectNote(noteid));
      } else {
        window.open(href, "_blank").focus();
      }
    },
    [dispatch]
  );

  const deleteNote = () => {
    // db.note.where("parentnoteid").equals(noteDetail.noteid).delete();
    db.note.delete(noteDetail.noteid);
    dispatch(actions.closeNoteListActionMenu());
    dispatch(actions.refreshTreeList());
  };

  return {
    updateNoteName,
    updateNoteData,
    onSearchLink,
    addSubNote,
    deleteNote,
    uploadImage,
    touched,
    isSaving,
    onClickLink,
  };
};

export default useNoteActions;
