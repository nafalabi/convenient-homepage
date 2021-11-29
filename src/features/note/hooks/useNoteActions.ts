import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import debounce from "@mui/utils/debounce";
import { actions } from "../slice";
import DexieAPI from "../../../app/api/dexie-api";
import Note from "../../../app/storage/dexie/Note";
import { IconData } from "../../../components/IconPicker/types";

const useNoteActions = (noteDetail: Note) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [touched, setTouched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateNoteName = useCallback(
    (value) => {
      if (!value) return;
      DexieAPI.note
        .updateNoteName(noteDetail, value)
        .catch((e) => console.log(e))
        .then((_) => dispatch(actions.refreshTreeList()));
    },
    [noteDetail, dispatch]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateNoteContent = useCallback(
    debounce((getData: () => string) => {
      !touched && setTouched(true);
      !isSaving && setIsSaving(true);
      setTimeout(async () => {
        try {
          const notecontent = getData();
          await DexieAPI.note.updateNoteContent(noteDetail, notecontent);
        } catch (error) {
          console.log(error);
        }
        setIsSaving(false);
      }, 300);
    }, 1000),
    [noteDetail, touched, isSaving, setTouched, setIsSaving]
  );

  const onSearchLink = useCallback(async (term) => {
    const results: { title?: string; subtitle: string; url: string }[] = [];

    try {
      const notes = await DexieAPI.note.searchNote(String(term));

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
    async (notename: string) => {
      let noteid = 0;
      try {
        noteid = await DexieAPI.note.addSubNote(noteDetail, notename);
      } catch (error) {
        console.log(error);
      }

      dispatch(actions.refreshTreeList());

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
    async (href: string) => {
      const match = href.match(/\/note\?id=(\d+)/);
      if (match) {
        const noteid = match[1];
        const noteData = await DexieAPI.note.findNoteById(noteid);
        if (noteData === undefined) {
          enqueueSnackbar("The page doesn't exist", {
            variant: "error",
          });
          return;
        }
        dispatch(actions.selectNote(noteid));
      } else {
        window.open(href, "_blank")?.focus();
      }
    },
    [dispatch, enqueueSnackbar]
  );

  const deleteNote = useCallback(async () => {
    try {
      await DexieAPI.note.deleteNote(noteDetail);
      dispatch(actions.refreshTreeList());
    } catch (error) {
      const message = (error as Error).message;
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  }, [dispatch, noteDetail, enqueueSnackbar]);

  const updateNoteIcon = useCallback(
    async (iconData: IconData) => {
      try {
        await DexieAPI.note.updateNoteIcon(noteDetail, iconData);
        dispatch(actions.refreshTreeList());
      } catch (error) {
        console.log(error);
      }
    },
    [noteDetail, dispatch]
  );

  return {
    updateNoteName,
    updateNoteContent,
    updateNoteIcon,
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
