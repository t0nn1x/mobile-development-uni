import React from "react";
import styled from "styled-components/native";
import { Game } from "../data/gamesData";

// Styled components
const Card = styled.TouchableOpacity<{ featured?: boolean }>`
  flex-direction: row;
  margin-vertical: 8px;
  border-radius: ${(props) => (props.featured ? "8px" : "4px")};
  overflow: hidden;
  background-color: ${(props) => props.theme.card};
  elevation: ${(props) => (props.featured ? 3 : 2)};
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1.5px;
`;

const FeaturedCard = styled(Card)`
  margin-vertical: 10px;
`;

const GameImage = styled.Image`
  width: 120px;
  height: 70px;
`;

const FeaturedImage = styled.Image`
  width: 100%;
  height: 180px;
`;

const Content = styled.View`
  flex: 1;
  padding: 10px;
`;

const FeaturedContent = styled.View`
  padding: 12px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  color: ${(props) => props.theme.text};
`;

const RecommendedBy = styled.Text`
  font-size: 14px;
  margin-bottom: 8px;
  font-style: italic;
  color: ${(props) => props.theme.text};
`;

const PlatformContainer = styled.View`
  flex-direction: row;
  margin-bottom: 4px;
`;

const PlatformText = styled.Text`
  color: ${(props) => props.theme.text};
  margin-right: 5px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const DiscountBadge = styled.View`
  padding-horizontal: 6px;
  padding-vertical: 2px;
  border-radius: 3px;
  margin-right: 8px;
  background-color: #4c6b22;
`;

const DiscountText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 12px;
`;

const PricesWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const OriginalPrice = styled.Text`
  text-decoration-line: line-through;
  margin-right: 5px;
  font-size: 12px;
  color: ${(props) => props.theme.text};
`;

const DiscountedPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const Price = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  featured = false,
}) => {
  const renderPlatformIcons = () => {
    return (
      <PlatformContainer>
        {game.platforms.includes("Windows") && (
          <PlatformText>🖥️ Windows</PlatformText>
        )}
        {game.platforms.includes("Mac") && <PlatformText>🍎 Mac</PlatformText>}
        {game.platforms.includes("Linux") && (
          <PlatformText>🐧 Linux</PlatformText>
        )}
      </PlatformContainer>
    );
  };

  if (featured) {
    return (
      <FeaturedCard activeOpacity={0.7} featured>
        <FeaturedImage source={{ uri: game.imageUri }} resizeMode="cover" />
        <FeaturedContent>
          <Title>{game.title}</Title>
          <RecommendedBy>Recommended by your friend, Player</RecommendedBy>
          <PriceContainer>
            {game.discountPercentage && (
              <DiscountBadge>
                <DiscountText>-{game.discountPercentage}%</DiscountText>
              </DiscountBadge>
            )}
            <PricesWrapper>
              {game.discountedPrice !== undefined && (
                <>
                  <OriginalPrice>${game.originalPrice}</OriginalPrice>
                  <DiscountedPrice>${game.discountedPrice}</DiscountedPrice>
                </>
              )}
              {game.discountedPrice === undefined && (
                <Price>${game.originalPrice}</Price>
              )}
            </PricesWrapper>
          </PriceContainer>
          {renderPlatformIcons()}
        </FeaturedContent>
      </FeaturedCard>
    );
  }

  return (
    <Card activeOpacity={0.7}>
      <GameImage source={{ uri: game.imageUri }} resizeMode="cover" />
      <Content>
        <Title>{game.title}</Title>
        {renderPlatformIcons()}
        <PriceContainer>
          {game.discountPercentage && (
            <DiscountBadge>
              <DiscountText>-{game.discountPercentage}%</DiscountText>
            </DiscountBadge>
          )}
          <PricesWrapper>
            {game.discountedPrice !== undefined && (
              <>
                <OriginalPrice>${game.originalPrice}</OriginalPrice>
                <DiscountedPrice>${game.discountedPrice}</DiscountedPrice>
              </>
            )}
            {game.discountedPrice === undefined && (
              <Price>${game.originalPrice}</Price>
            )}
          </PricesWrapper>
        </PriceContainer>
      </Content>
    </Card>
  );
};
