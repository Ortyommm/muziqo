import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { IAuthor, ISong } from "../../types/SongsTypes";
import { setTempSongs } from "../../store/modules/songs";
import {
  Container,
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
import { setSearchUsers } from "@/store/modules/users";
import { IUser } from "@/types/UserTypes";
import AddSongOrAuthor from "./components/AddSongOrAuthor";
import { isError } from "lodash-es";
import { headerWithMarginHeight } from "@/constants";
import useFooterHeight from "../../hooks/useFooterHeight";
import useCalculatedHeight from "../../hooks/useCalculatedHeight";
import SongsList from "@/components/SongsList/SongsList";
import UsersList from "@/components/UsersList/UsersList";
import AuthorList from "@/components/Authors/AuthorList";

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

  const footerHeight = useFooterHeight();
  const searchHeight = 72;
  const height = useCalculatedHeight(
    window.innerHeight - headerWithMarginHeight - footerHeight - searchHeight,
    "discover"
  );

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
    }
  }

  function onSearchItem(event: SelectChangeEvent) {
    const selectedSearchItem = event.target.value as SearchItems;
    setCurrentPage(0);
    const currentItems = getCurrentItems(selectedSearchItem);
    setIsAllDataFetched(currentItems.length < 50 && currentItems.length !== 0);
    setSearchText("");
    setSearchItem(selectedSearchItem);
  }

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
        setAuthors(currentPage ? [...authors, ...data] : data);
        break;
      case "users": {
        //TODO user pagination
        //TODO user search
        console.log(data);
        dispatch(setSearchUsers(data as IUser[]));
        break;
      }
    }
    if (data.length < 50) setIsAllDataFetched(true);
    else setIsAllDataFetched(false);
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

  const currentList = () => {
    switch (searchItem) {
      case "songs":
        return (
          <SongsList
            items={tempSongs}
            isFetching={isLoading}
            loadMoreItems={loadMoreItems}
            height={height}
          />
        );

      case "users":
        return (
          <UsersList
            items={searchUsers}
            isFetching={isLoading}
            height={height}
          />
        );

      case "author":
      default:
        return (
          <AuthorList
            items={authors}
            isFetching={isLoading}
            loadMoreItems={loadMoreItems}
            height={height}
          />
        );
    }
  };

  return (
    <>
      <Container sx={{ mb: 0, mt: 2 }}>
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
        {currentList()}
      </Container>
      <AddSongOrAuthor />
    </>
  );
};

export default Discover;
