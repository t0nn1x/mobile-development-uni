import React from "react";
import styled from "styled-components/native";
import { ChatItem as ChatItemType } from "../data/chatsData";

// Styled components
const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;

const AvatarContainer = styled.View`
  position: relative;
  margin-right: 12px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const AvatarOrange = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #e67e22;
  justify-content: center;
  align-items: center;
`;

const AvatarRed = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #e74c3c;
  justify-content: center;
  align-items: center;
`;

const AvatarDefault = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #34495e;
  justify-content: center;
  align-items: center;
`;

const AvatarText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const OnlineIndicator = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #2ecc71;
  border-width: 1px;
  border-color: white;
`;

const OfflineIndicator = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #3498db;
  border-width: 1px;
  border-color: white;
`;

const DiamondBadge = styled.Text`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Username = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

const MessageContainer = styled.View`
  flex-direction: row;
  margin-top: 2px;
`;

const YouText = styled.Text`
  color: ${(props) => props.theme.tabBarInactive};
`;

const Message = styled.Text`
  font-size: 14px;
  flex: 1;
  color: ${(props) => props.theme.tabBarInactive};
`;

const Date = styled.Text`
  font-size: 14px;
  margin-left: 4px;
  color: ${(props) => props.theme.tabBarInactive};
`;

const UnreadBadge = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #3498db;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

const UnreadText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

interface ChatItemProps {
  chat: ChatItemType;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const renderAvatar = () => {
    if (chat.avatarUri && chat.userName === "Σxprεssσ #=_-#") {
      return (
        <AvatarContainer>
          <Avatar source={{ uri: chat.avatarUri }} />
          <DiamondBadge>💎</DiamondBadge>
        </AvatarContainer>
      );
    } else if (chat.avatarUri && chat.userName === "Mark Dyson") {
      return (
        <AvatarContainer>
          <AvatarOrange>
            <AvatarText>😎</AvatarText>
          </AvatarOrange>
          {chat.isOnline && <OnlineIndicator />}
        </AvatarContainer>
      );
    } else if (chat.userName === "Player123") {
      return (
        <AvatarContainer>
          <AvatarRed>
            <AvatarText>⚠️</AvatarText>
          </AvatarRed>
          {chat.isOnline && <OnlineIndicator />}
          {!chat.isOnline && <OfflineIndicator />}
        </AvatarContainer>
      );
    } else {
      return (
        <AvatarContainer>
          <AvatarDefault>
            <AvatarText>?</AvatarText>
          </AvatarDefault>
        </AvatarContainer>
      );
    }
  };

  return (
    <Container activeOpacity={0.7}>
      {renderAvatar()}
      <ContentContainer>
        <HeaderContainer>
          <Username>{chat.userName}</Username>
        </HeaderContainer>
        <MessageContainer>
          {chat.isUser && <YouText>You: </YouText>}
          <Message numberOfLines={1}>{chat.lastMessage}</Message>
          <Date> • {chat.date}</Date>
        </MessageContainer>
      </ContentContainer>
      {chat.unreadCount && (
        <UnreadBadge>
          <UnreadText>{chat.unreadCount}</UnreadText>
        </UnreadBadge>
      )}
    </Container>
  );
};
