import React, { ChangeEvent, useEffect, useState } from "react";
import SongsList from "../SongsList/SongsList";
import { useAppDispatch, useAppSelector } from "../../store";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { ISong } from "../../types/SongsTypes";
import { setDiscoverSongs, setSearchSongs } from "../../store/modules/songs";
import {
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { setSearchUsers } from "../../store/modules/users";
import { IUser } from "../../types/UserTypes";
import UsersList from "../UsersList/UsersList";

const Discover = () => {
  const discoverSongs = useAppSelector((state) => state.songs.discover);
  const searchSongs = useAppSelector((state) => state.songs.search);
  const searchUsers = useAppSelector((state) => state.users.search);
  const [searchText, setSearchText] = useState("");

  const dispatch = useAppDispatch();
  //TODO maybe move to state
  const [isLoading, setIsLoading] = useState(true);

  const [searchTimeout, setSearchTimeout] = useState(0);
  type SearchItems = "songs" | "users";
  const [searchItem, setSearchItem] = useState<SearchItems>("songs");

  //TODO authorSearch, userSearch

  function onSearch(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setSearchText(event.target.value);
    clearTimeout(searchTimeout);
    setIsLoading(true);
    setSearchTimeout(
      window.setTimeout(() => {
        api
          .get("/songs", { params: { name: event.target.value } })
          .then((res: AxiosResponse<ISong[]>) => {
            dispatch(setSearchSongs(res.data));
            setIsLoading(false);
          });
      }, 300)
    );
  }

  useEffect(() => {
    setIsLoading(true);
    api.get(searchItem).then((res: AxiosResponse<ISong[] | IUser[]>) => {
      switch (searchItem) {
        case "songs": {
          dispatch(setDiscoverSongs(res.data as ISong[]));
          break;
        }
        case "users": {
          dispatch(setSearchUsers(res.data as IUser[]));
          break;
        }
      }
      setIsLoading(false);
    });
  }, [searchItem]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={2}>
          <FormControl sx={{ width: "80%" }}>
            <InputLabel id="demo-simple-select-label">Search for</InputLabel>
            <Select
              labelId="select-label"
              label="Search for"
              value={searchItem}
              onChange={(event) =>
                setSearchItem(event.target.value as SearchItems)
              }
            >
              <MenuItem value="songs">Songs</MenuItem>
              <MenuItem value="users">Users</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <TextField
            value={searchText}
            onChange={onSearch}
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      {searchItem === "songs" ? (
        <SongsList
          songs={searchText ? searchSongs : discoverSongs}
          isFetching={isLoading}
        />
      ) : (
        <UsersList users={searchUsers} />
      )}
    </Container>
  );
};

export default Discover;
