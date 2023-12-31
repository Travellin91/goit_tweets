import React, { useState, useEffect } from 'react';
import { formatInteger } from 'helpers/formatInteger';
import {
  Card,
  BackgrWrap,
  Avatar,
  AvatarWrap,
  AvatarBorder,
  Button,
  Box,
  StatsData,
} from './ProfileList.styled';

const API_URL = 'https://65290dd855b137ddc83e2108.mockapi.io/users';

export const ProfileList = () => {
  const [data, setData] = useState([]);
  const [usersPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}?page=${currentPage}&limit=${usersPerPage}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const usersData = await response.json();

        if (currentPage === 1) {
          setData(usersData);
        } else {
          setData(prevData => [...prevData, ...usersData]);
        }

        if (usersData.length < usersPerPage) {
          setAllDataLoaded(true);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [currentPage, usersPerPage]);

  const handleClick = id => {
    setData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          const newFollowersCount =
            item.followers + (item.buttonStatus ? -1 : 1);
          return {
            ...item,
            buttonStatus: !item.buttonStatus,
            followers: newFollowersCount >= 0 ? newFollowersCount : 0,
          };
        }
        return item;
      })
    );
  };

  const loadMoreUsers = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {data.map(({ id, user, tweets, followers, avatar, buttonStatus }) => (
        <Card key={id}>
          <BackgrWrap />
          <Box>
            <AvatarBorder>
              <AvatarWrap>
                <Avatar src={avatar} alt="User avatar" />
              </AvatarWrap>
            </AvatarBorder>
          </Box>
          <StatsData>{user}</StatsData>
          <StatsData>Tweets: {tweets}</StatsData>
          <StatsData>Followers: {formatInteger(followers)}</StatsData>
          <Button onClick={() => handleClick(id)} buttonStatus={buttonStatus}>
            {buttonStatus ? 'Following' : 'Follow'}
          </Button>
        </Card>
      ))}
      {!allDataLoaded && <Button onClick={loadMoreUsers}>Load More</Button>}
    </>
  );
};
