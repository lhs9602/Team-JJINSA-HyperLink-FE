import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/common';
import useInput from '@/hooks/useInput';
import { isAuthorizedState } from '@/stores/auth';
import { isLoginModalVisibleState } from '@/stores/modal';
import { selectedTabState } from '@/stores/tab';
import * as style from './style.css';

export type SearchBarProps = {
  version?: 'header' | 'banner';
  onEnterPress?: () => void;
};

const SearchBar = ({ version = 'header', onEnterPress }: SearchBarProps) => {
  const navigate = useNavigate();
  const isAuthorized = useRecoilValue(isAuthorizedState);
  const setIsLoginModalVisible = useSetRecoilState(isLoginModalVisibleState);
  const setTabState = useSetRecoilState(selectedTabState);
  const { value: keyword, onChange: handleKeywordChange } = useInput('');
  const inputStyle = {
    margin: version === 'header' ? '0 1rem' : '0',
  };

  const handleEnterPress = async () => {
    if (!isAuthorized) {
      setIsLoginModalVisible(true);
      return;
    }
    if (!keyword.trim().length) {
      alert('한 글자 이상 검색해주세요!');
      return;
    }

    onEnterPress?.();
    setTabState('none');
    navigate(`/search/${keyword}`);
  };

  return (
    <div className={style.searchBar({ version })}>
      <Input
        style={inputStyle}
        version={version}
        type="text"
        placeholder="키워드를 검색하세요."
        value={keyword}
        onChange={handleKeywordChange}
        onEnterPress={handleEnterPress}
      />
    </div>
  );
};

export default SearchBar;
