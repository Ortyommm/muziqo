import { useAppDispatch } from "../../store";
import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import { addSongToDiscover } from "../../store/modules/songs";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { IAuthor } from "../../types/SongsTypes";
import {
  Autocomplete,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { getFileNameFromInput, textFieldBind } from "../../utils/input";
import SubmitButton from "./SubmitButton";

export default function AddSongForm({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSongError("");
      setImgFile("");
      setSongFile("");
      setName("");
    }, 300);
  }

  //form items
  const songInput = useRef<HTMLInputElement>(null);
  const imgInput = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [songFile, setSongFile] = useState("");
  const [imgFile, setImgFile] = useState("");

  const [author, setAuthor] = useState<{ label: string; id: number } | null>(
    null
  );
  const [authors, setAuthors] = useState<{ label: string; id: number }[]>([]);

  const [songError, setSongError] = useState("");

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    //TODO add validation

    if (!songInput.current?.files || songInput.current.files.length === 0) {
      //doesn't displays now
      setSongError("You should upload a song");
      setTimeout(() => setSongError(""), 2000);
      return;
    }

    const data = new FormData();
    data.append("file", songInput.current.files[0]);
    if (imgInput.current?.files) data.append("img", imgInput.current.files[0]);
    data.append("name", name);
    data.append("description", description);
    if (author) data.append("authorId", author.id.toString());

    dispatch(addSongToDiscover(data));
    handleClose();
  }

  let getAuthorsTimeout: number;
  function getAuthors(name?: string) {
    clearTimeout(getAuthorsTimeout);
    getAuthorsTimeout = window.setTimeout(() => {
      api
        .get("author", {
          params: {
            fetch_songs: false,
            name: name,
          },
        })
        .then((res: AxiosResponse<IAuthor[]>) => {
          setAuthors(res.data.map((el) => ({ label: el.name, id: el.id })));
        });
    }, 300);
  }

  function onAuthorTextChange(event: ChangeEvent<HTMLInputElement>) {
    // setAuthor(event.target.value);
    getAuthors(event.target.value);
  }

  function setAuthorValue(
    _: SyntheticEvent,
    value: { label: string; id: number } | null
  ) {
    setAuthor(value);
  }

  return (
    <>
      <DialogTitle>Add song</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            "& .MuiButton-root": { m: 1, width: "100%" },
          }}
          onSubmit={onFormSubmit}
        >
          <TextField label="Name" {...textFieldBind(name, setName)} required />
          <TextField
            label="Description"
            {...textFieldBind(description, setDescription)}
          />
          <Autocomplete
            isOptionEqualToValue={() => true}
            options={authors}
            onChange={setAuthorValue}
            renderInput={(params) => (
              <TextField
                value={author?.label}
                onClick={() => getAuthors()}
                onChange={onAuthorTextChange}
                {...params}
                label="Author"
              />
            )}
          />
          <Button
            variant="contained"
            component="label"
            color={songError ? "error" : "primary"}
          >
            {getFileNameFromInput(songFile) || "Upload song"}
            <input
              type="file"
              hidden
              accept=".mp3, .wav, .ogg, .m4a"
              ref={songInput}
              onChange={(event) => setSongFile(event.target.value)}
            />
          </Button>
          <Button variant="contained" component="label">
            {getFileNameFromInput(imgFile) || "Upload image"}
            <input
              type="file"
              hidden
              accept=".jpg, .jpeg, .jfif, .png, .gif, .webp, .svg"
              ref={imgInput}
              onChange={(event) => setImgFile(event.target.value)}
            />
          </Button>
          <SubmitButton />
        </Box>
      </DialogContent>
    </>
  );
}
