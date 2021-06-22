import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  return <Route path="/:category?" component={NewsPage} />;
};

export default App;

/*
위 코드에서 사용된 path에 /:category?와 같은 형태로 맨 뒤에 물음표 문자가 들어가 있는데요. 
이는 category 값이 선택적(optional)이라는 의미입니다. 
즉, 있을 수도 있고 없을 수도 있다는 뜻이죠. category URL 파라미터가 없다면 전체 카테고리를 선택한 것으로 간주합니다.
*/
