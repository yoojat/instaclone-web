import { ApolloCache, FetchResult } from '@apollo/client';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components/macro';
import Avatar from '../../components/Avatar';
import { FatText } from '../../components/shared';
import Comments from './Comments';
import { CommentProps } from './interfaces';
import { ToggleLikeMutation, useToggleLikeMutation } from './queries.generated';

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

interface Props {
  id: number;
  user: {
    avatar?: string | null;
    username: string;
  };
  file: string;
  isLiked: boolean;
  likes: number;
  caption?: string | null;
  commentNumber: number;
  comments?: Array<CommentProps | null>;
}

const Photo: React.FC<Props> = ({ id, user, file, isLiked, likes, caption, commentNumber, comments }) => {
  const updateToggleLike = (
    cache: ApolloCache<ToggleLikeMutation>,
    result?: Omit<FetchResult<ToggleLikeMutation>, 'context'>,
  ) => {
    if (result && result.data) {
      const {
        data: {
          toggleLike: { ok },
        },
      } = result;
      if (ok) {
        // cache를 수정하는 방법1
        // cache.writeFragment({
        //   id: `Photo:${id}`,
        //   fragment: gql`
        //     fragment BSName on Photo {
        //       isLiked
        //     }
        //   `,
        //   data: {
        //     isLiked: !isLiked,
        //   },
        // });

        // cache를 수정하는 방법2
        // const fragmentId = `Photo:${id}`;
        // const fragment = gql`
        //   fragment BSName on Photo {
        //     isLiked
        //     likes
        //   }
        // `;
        // const result = cache.readFragment({
        //   id: fragmentId,
        //   fragment,
        // }) as any;
        // if ('isLiked' in result && 'likes' in result) {
        //   const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
        //   cache.writeFragment({
        //     id: fragmentId,
        //     fragment,
        //     data: {
        //       id,
        //       isLiked: !cacheIsLiked,
        //       likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
        //     },
        //   });
        // }

        // cache를 수정하는 방법 3
        const photoId = `Photo:${id}`;
        cache.modify({
          id: photoId,
          fields: {
            isLiked(prev) {
              return !prev;
            },
            likes(prev) {
              if (isLiked) {
                return prev - 1;
              }
              return prev + 1;
            },
          },
        });
      }
    }
  };
  const [toggleLikeMutation] = useToggleLikeMutation({ variables: { id }, update: updateToggleLike });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user.avatar || ''} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? 'tomato' : 'inherit' }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption || ''}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
