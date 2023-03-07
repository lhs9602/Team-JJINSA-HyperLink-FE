import { MouseEvent, useEffect, useState } from 'react';
import { Icon } from '@/components/common';
import ImageComponent from '@/components/common/Image';
import * as style from './style.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postBookmarkResponse } from '@/api/bookmark';
import { postLikeResponse } from '@/api/like';
import { useRecoilState } from 'recoil';
import { selectedCategoryState } from '@/stores/selectedCategory';
import { isAuthorizedState } from '@/stores/auth';
import { isLoginModalVisibleState } from '@/stores/modal';

type CardTopProps = {
  contentId: number;
  contentImgUrl: string;
  isBookmarked: boolean;
  isLiked: boolean;
  likeCount: number;
  viewCount: number;
};

const CardTop = ({
  contentId,
  contentImgUrl,
  isBookmarked,
  isLiked,
  likeCount,
  viewCount,
}: CardTopProps) => {
  const [userBookmarked, setUserBookmarked] = useState<boolean>(isBookmarked);
  const [userLiked, setUserLiked] = useState<boolean>(isLiked);

  // 북마크 연동할 때, 지우겠습니다.
  // const likeResponse = useQuery(
  //   ['like'],
  //   () => getLikeResponse(contentId, userLiked),
  //   {
  //     enabled: false,
  //   }
  // );
  const [isAuthorized, setIsAuthorized] = useRecoilState(isAuthorizedState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const [isLoginModalVisible, setIsLoginModalVisible] = useRecoilState(
    isLoginModalVisibleState
  );

  const queryClient = useQueryClient();
  const bookmarkMutation = useMutation({
    mutationFn: async () => await postBookmarkResponse(contentId, isBookmarked),

    onSuccess: () =>
      queryClient.invalidateQueries(['main_contents', selectedCategory]),
  });
  const likeMutation = useMutation({
    mutationFn: async () => await postLikeResponse(contentId, userLiked),

    onSuccess: () =>
      queryClient.invalidateQueries(['main_contents', selectedCategory]),
  });

  const handleBookmarkClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthorized) {
      setIsLoginModalVisible(true);
      return false;
    }
    setUserBookmarked(!userBookmarked);
    bookmarkMutation.mutate();
  };

  const handleLikeClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthorized) {
      setIsLoginModalVisible(true);
      return false;
    }
    setUserLiked(!userLiked);
    likeMutation.mutate();
  };
  useEffect(() => {
    setUserBookmarked(isBookmarked);
  }, [isBookmarked]);
  return (
    <section className={style.cardTop}>
      <ImageComponent
        defaultImage="https://via.placeholder.com/200"
        src={contentImgUrl}
        alt="카드 썸네일 이미지"
        block={true}
        width="100%"
        height="21rem"
        objectFit="cover"
      />
      <div
        className={style.bookmarkWrapper({ bookmark: isBookmarked })}
        onClick={handleBookmarkClick}
      >
        {isBookmarked ? (
          <div className={style.iconWrapper({ bookmark: true })}>
            <Icon
              name="bookmark"
              type="solid"
              size="large"
              style={{ color: 'white' }}
            />
          </div>
        ) : (
          <div className={style.iconWrapper({ bookmark: true })}>
            <Icon name="bookmark" type="regular" size="large" color="white" />
          </div>
        )}
      </div>
      <div className={style.numberIconWrapper}>
        {userLiked ? (
          <div
            className={style.iconWrapper({ heart: true })}
            onClick={handleLikeClick}
          >
            <Icon
              name="heart"
              type="solid"
              size="medium"
              style={{ color: 'red' }}
            />
            <div style={{ color: 'white' }}>{likeCount}</div>
          </div>
        ) : (
          <div
            className={style.iconWrapper({ heart: true })}
            onClick={handleLikeClick}
          >
            <Icon name="heart" type="regular" size="medium" />
            <div>{likeCount}</div>
          </div>
        )}
        <div className={style.iconWrapper({ eyes: true })}>
          <Icon name="eye" type="regular" size="medium" />
          <div>{viewCount}</div>
        </div>
      </div>
    </section>
  );
};

export default CardTop;
