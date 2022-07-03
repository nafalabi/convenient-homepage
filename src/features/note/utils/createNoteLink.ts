export const NOTE_BASE_URL = "/index.html#/note";

const createNoteLink = (noteid?: number | string) => {
  let url = NOTE_BASE_URL;
  if (noteid) url += `?${noteid}`;
  return url;
};

export default createNoteLink;
