import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import debounce from "@mui/utils/debounce";
import { actions } from "../slice";
import AppController from "app/controller";
import { IconData } from "components/IconPicker/types";

const useNoteActions = (noteid?: number | string) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [touched, setTouched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateNoteName = useCallback(
    (value) => {
      if (!value || !noteid) return;
      return AppController.note
        .updateNoteName(noteid, value)
        .catch((e) => console.log(e));
    },
    [noteid]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateNoteContent = useCallback(
    debounce((getData: () => string) => {
      if (!noteid) return;
      !touched && setTouched(true);
      !isSaving && setIsSaving(true);
      setTimeout(async () => {
        try {
          const notecontent = getData();
          await AppController.note.updateNoteContent(noteid as number, notecontent);
        } catch (error) {
          console.log(error);
        }
        setIsSaving(false);
      }, 300);
    }, 1000),
    [noteid, touched, isSaving, setTouched, setIsSaving]
  );

  const onSearchLink = useCallback(async (term) => {
    const results: { title: string; subtitle: string; url: string }[] = [];

    try {
      const notes = await AppController.note.searchNote(String(term));

      notes.forEach((note) => {
        results.push({
          title: note.notename ?? "",
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
      if (!noteid) return "";

      let subnoteid = 0;
      try {
        subnoteid = await AppController.note.addSubNote(noteid, notename);
      } catch (error) {
        console.log(error);
      }

      return `/note?id=${subnoteid}`;
    },
    [noteid]
  );

  const uploadImage = useCallback(async (file) => {
    const imageDataBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return imageDataBase64 as string;
  }, []);

  const onClickLink = useCallback(
    async (href: string) => {
      const match = href.match(/\/note\?id=(\d+)/);
      if (match) {
        const noteid = match[1];
        const noteData = await AppController.note.findNoteById(noteid);
        if (noteData === undefined) {
          enqueueSnackbar("The page doesn't exist", {
            variant: "error",
          });
          return;
        }
        dispatch(actions.selectNote(parseInt(noteid)));
      } else {
        window.open(href, "_blank")?.focus();
      }
    },
    [dispatch, enqueueSnackbar]
  );

  const deleteNote = useCallback(async () => {
    if (!noteid) return;
    try {
      await AppController.note.deleteNote(noteid);
    } catch (error) {
      const message = (error as Error).message;
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  }, [noteid, enqueueSnackbar]);

  const updateNoteIcon = useCallback(
    async (iconData: IconData) => {
      if (!noteid) return;
      try {
        await AppController.note.updateNoteIcon(noteid, iconData);
      } catch (error) {
        console.log(error);
      }
    },
    [noteid]
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
