import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList, ActivityIndicator } from "react-native";
import { ThemeToggle } from "../components/ThemeToggle";
import { GameCard } from "../components/GameCard";
import { gamesData, categories, Game } from "../data/gamesData";

// Styled components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
  padding-vertical: 12px;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 10px;
`;

const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const SearchButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled.Text`
  color: ${(props) => props.theme.tabBarInactive};
`;

const CategoriesContainer = styled.View`
  padding-horizontal: 16px;
  padding-vertical: 8px;
`;

const CategoryButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 20px;
  margin-right: 10px;
  background-color: ${(props) =>
    props.isSelected ? props.theme.primary : props.theme.card};
`;

const CategoryText = styled.Text<{ isSelected: boolean }>`
  font-weight: bold;
  color: ${(props) => (props.isSelected ? "white" : props.theme.text)};
`;

const LoaderContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

export default function StoreScreen() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [games, setGames] = useState<Game[]>(gamesData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const featuredGame = games.find((game) => game.featured);

  const loadMoreGames = () => {
    if (loading) return;

    setLoading(true);

    // Simulate loading more data
    setTimeout(() => {
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <LoaderContainer>
        <ActivityIndicator size="small" color="#66c0f4" />
      </LoaderContainer>
    );
  };

  return (
    <Container>
      <Header>
        <LogoContainer>
          <Logo
            source={{
              uri: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_logo.png",
            }}
          />
          <HeaderTitle>Store</HeaderTitle>
        </LogoContainer>
        <SearchButton>
          <SearchIcon>🔍</SearchIcon>
        </SearchButton>
      </Header>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard game={item} featured={item.id === featuredGame?.id} />
        )}
        ListHeaderComponent={() => (
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategoryButton
                isSelected={selectedCategory === item.id}
                onPress={() => setSelectedCategory(item.id)}
              >
                <CategoryText isSelected={selectedCategory === item.id}>
                  {item.title}
                </CategoryText>
              </CategoryButton>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          />
        )}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreGames}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      <ThemeToggle />
    </Container>
  );
}
