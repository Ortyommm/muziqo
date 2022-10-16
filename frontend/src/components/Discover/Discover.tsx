import React, { ChangeEvent, useEffect, useState } from "react";
import SongsList from "../SongsList/SongsList";
import { useAppDispatch, useAppSelector } from "../../store";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { IAuthor, ISong } from "../../types/SongsTypes";
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
import { isError } from "lodash-es";
import AuthorList from "../Authors/components/AuthorList";

const Discover = () => {
  const dispatch = useAppDispatch();
  // const discoverSongs = useAppSelector((state) => state.songs.discover);
  const tempSongs = useAppSelector((state) => state.songs.temp);
  const searchUsers = useAppSelector((state) => state.users.search);
  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isAllDataFetched, setIsAllDataFetched] = useState(false);

  const [searchTimeout, setSearchTimeout] = useState(0);
  type SearchItems = "songs" | "users" | "author";
  const [searchItem, setSearchItem] = useState<SearchItems>("songs");

  const [currentPage, setCurrentPage] = useState(0);

  const [authors, setAuthors] = useState<IAuthor[]>([]);

  const getCurrentItems = (selectedSearchItem: string) => {
    switch (selectedSearchItem) {
      case "songs":
        return tempSongs;
      case "users":
        return searchUsers;
      case "author":
      default:
        return authors;
    }
  };

  function setDataBySearchItem(data: ISong[] | IUser[]) {
    switch (searchItem) {
      case "songs": {
        dispatch(
          setTempSongs(
            currentPage
              ? [...tempSongs, ...(data as ISong[])]
              : (data as ISong[])
          )
        );
        break;
      }
      case "author":
        setAuthors(data);
        break;
      case "users": {
        //TODO user pagination
        //TODO user search
        dispatch(setSearchUsers(data as IUser[]));
        break;
      }
    }
    if (data.length < 50) setIsAllDataFetched(true);
  }

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
          .get(searchItem, {
            params: { name: event.target.value, page: currentPage },
          })
          .then((res: AxiosResponse<ISong[]>) => {
            setDataBySearchItem(res.data);
          })
          .finally(() => setIsLoading(false));
      }, 300)
    );
  }

  useEffect(() => {
    if (!currentPage) setIsLoading(true);
    api
      .get(searchItem, { params: { page: currentPage } })
      .then((res: AxiosResponse<ISong[] | IUser[]>) => {
        if (isError(res)) throw res;
        setDataBySearchItem(res.data);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log("err", err);
        } /*setError()*/
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchItem, currentPage]);

  function loadMoreItems(startIndex: number, stopIndex: number) {
    // console.log("loadMoreItems");
    let items: ISong[] | IAuthor[];
    switch (searchItem) {
      case "songs":
        items = tempSongs;
        break;
      case "author":
      default:
        items = authors;
        break;
    }
    if (isAllDataFetched) return;

    if (stopIndex > items.length * 0.8) {
      setCurrentPage(currentPage + 1);
      // console.log(items, stopIndex);
    }
  }

  function onSearchItem(event: SelectChangeEvent) {
    const selectedSearchItem = event.target.value as SearchItems;
    setCurrentPage(0);
    setIsAllDataFetched(getCurrentItems(selectedSearchItem).length < 50);
    setSearchText("");
    setSearchItem(selectedSearchItem);
  }

  const CurrentList = () => {
    switch (searchItem) {
      case "songs":
        return (
          <SongsList
            songs={tempSongs}
            isFetching={isLoading}
            loadMoreItems={loadMoreItems}
          />
        );
      case "users":
        return <UsersList users={searchUsers} />;
      case "author":
        return (
          <AuthorList
            authors={authors}
            isFetching={isLoading}
            loadMoreItems={loadMoreItems}
          />
        );
      default:
        return <></>;
    }
  };

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
                <MenuItem value="author">Authors</MenuItem>
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
        <CurrentList />
      </Container>
      <AddSongOrAuthor />
    </>
  );
};

export default Discover;
