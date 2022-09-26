import React, { ChangeEvent, useEffect, useState } from "react";
import SongsList from "../SongsList/SongsList";
import { useAppDispatch, useAppSelector } from "../../store";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { ISong } from "../../types/SongsTypes";
import { setTempSongs } from "../../store/modules/songs";
import {
  Container,
  Fab,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { setSearchUsers } from "../../store/modules/users";
import { IUser } from "../../types/UserTypes";
import UsersList from "../UsersList/components/UsersList";
import AddSongOrAuthor from "./AddSongOrAuthor";

const Discover = () => {
  const dispatch = useAppDispatch();
  // const discoverSongs = useAppSelector((state) => state.songs.discover);
  const tempSongs = useAppSelector((state) => state.songs.temp);
  const searchUsers = useAppSelector((state) => state.users.search);
  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isAllDataFetched, setIsAllDataFetched] = useState(false);

  const [searchTimeout, setSearchTimeout] = useState(0);
  type SearchItems = "songs" | "users";
  const [searchItem, setSearchItem] = useState<SearchItems>("songs");

  const [currentPage, setCurrentPage] = useState(0);

  //TODO authorSearch

  function onSearch(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setCurrentPage(0);
    setSearchText(event.target.value);
    clearTimeout(searchTimeout);
    setIsLoading(true);
    setSearchTimeout(
      window.setTimeout(() => {
        api
          .get("/songs", {
            params: { name: event.target.value, page: currentPage },
          })
          .then((res: AxiosResponse<ISong[]>) => {
            dispatch(setTempSongs(res.data));
            setIsLoading(false);
          });
      }, 300)
    );
  }

  useEffect(() => {
    if (!currentPage) setIsLoading(true);
    api
      .get(searchItem, { params: { page: currentPage } })
      .then((res: AxiosResponse<ISong[] | IUser[]>) => {
        switch (searchItem) {
          case "songs": {
            dispatch(
              setTempSongs(
                currentPage
                  ? [...tempSongs, ...(res.data as ISong[])]
                  : (res.data as ISong[])
              )
            );
            if (res.data.length < 50) setIsAllDataFetched(true);
            break;
          }
          case "users": {
            dispatch(setSearchUsers(res.data as IUser[]));
            break;
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchItem, currentPage]);

  function loadMoreItems(startIndex: number, stopIndex: number) {
    if (isAllDataFetched) return;
    if (stopIndex > tempSongs.length * 0.8) setCurrentPage(currentPage + 1);
  }

  function onSearchItem(event: SelectChangeEvent) {
    setCurrentPage(0);
    setIsAllDataFetched(false);
    setSearchItem(event.target.value as SearchItems);
  }

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={4} lg={2}>
            <FormControl sx={{ width: "80%" }}>
              <InputLabel id="select-label">Search for</InputLabel>
              <Select
                labelId="select-label"
                label="Search for"
                value={searchItem}
                onChange={onSearchItem}
              >
                <MenuItem value="songs">Songs</MenuItem>
                <MenuItem value="users">Users</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8} lg={10}>
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
            songs={tempSongs}
            isFetching={isLoading}
            loadMoreItems={loadMoreItems}
          />
        ) : (
          <UsersList users={searchUsers} />
        )}
      </Container>
      <AddSongOrAuthor />
    </>
  );
};

export default Discover;
