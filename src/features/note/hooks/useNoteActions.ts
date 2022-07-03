import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import debounce from "@mui/utils/debounce";
import { actions } from "../slice";
import AppController from "app/controller";
import { IconData } from "components/IconPicker/types";
import createNoteLink from "../utils/createNoteLink";

const useNoteActions = (noteid?: number | string) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [modifiedContent, setModifiedContent] = useState("");

  useEffect(() => {
    setModifiedContent("");
  }, [noteid]);

  const updateNoteName = useCallback(
    (value) => {
      if (!value || !noteid) return;
      return AppController.note
        .updateNoteName(noteid, value)
        .catch((e) => console.log(e));
    },
    [noteid]
  );

  const saveContent = useMemo(
    () =>
      debounce(() => {
        if (!noteid) return;
        if (!modifiedContent) return;

        dispatch(actions.setIsSaving(true));

        setTimeout(async () => {
          try {
            await AppController.note.updateNoteContent(
              noteid as number,
              modifiedContent
            );
          } catch (error) {
            console.log(error);
          }

          dispatch(actions.setIsSaving(false));
          dispatch(actions.setIsModified(false));
        }, 300);
      }, 300),
    [dispatch, modifiedContent, noteid]
  );

  const modifyContent = useMemo(
    () =>
      debounce((getData: () => string) => {
        dispatch(actions.setIsModified(true));
        setModifiedContent(getData());
      }, 500),
    [dispatch]
  );

  const onSearchLink = useCallback(async (term) => {
    const results: { title: string; subtitle: string; url: string }[] = [];

    try {
      const notes = await AppController.note.searchNote(String(term));

      notes.forEach((note) => {
        results.push({
          title: note.notename ?? "",
          subtitle: note.parentnoteid ? `Sub Note` : `Root Note`,
          url: createNoteLink(note.noteid),
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

      return createNoteLink(subnoteid);
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
      const match = href.match(/\/note\?noteid=(\d+)/);
      if (match) {
        const noteid = match[1];
        dispatch(actions.navigateTo(Number(noteid) || undefined));
      } else {
        window.open(href, "_blank")?.focus();
      }
    },
    [dispatch]
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
    saveContent,
    modifyContent,
    modifiedContent,
    updateNoteIcon,
    onSearchLink,
    addSubNote,
    deleteNote,
    uploadImage,
    onClickLink,
  };
};

export default useNoteActions;
