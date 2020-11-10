# 외부 API를 연동하여 뉴스 뷰어 만들기

1. 뉴스 뷰어 UI 만들기

   > > Newsitem은 NewsList안에 들어가는 각각 하나의 아이템들을 나타내는 컴포넌트입니다. 각각의 뉴스 정보를 보여줍니다.
   > > NewsItem 컴포넌트는 article이라는 객체를 props로 통째로 받아 와서 사용합니다.
   > > NewsList는 API를 요청하고 뉴스 데이터가 들어 있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트입니다.

2. 데이터 연동하기

   > > 컴포넌트가 화면에 보이는 시점에 API를 요청합니다. 이때 useEffect()를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API를 사용하면 됩니다.
   > > 여기서 주의할 점은 useEffect에 등록하는 함수에 async를 붙이면 안 된다는 것입니다. useEffect에서 반환하는 값은 뒷정리(cleanup) 함수이기 때문입니다.
   > > 따라서 useEffect 내부에서 async/await를 사용하고 싶다면, 함수 내부에 async 키워드가 붙은 다른 함수를 만들어 사용해 주어야 합니다. (const fetchData = async() => { ...})

3. 카테고리 기능 구현하기

   > > 뉴스 카테고리는 총 여섯 개이며, 다음과 같습니다. (business, science, entertainment, sports, health, technology)
   > > 카테고리의 상태는 useState를 따라서 관리합니다. 추가로 category 값을 업데이트하는 onSelect 함수도 만들어 주었습니다. 그리고 나서 category와 onSelect 함수를 Categories 컴포넌트에게 props로 전달합니다. 또한, category 값을 NewsList 컴포넌트에게도 전달해 주어야 합니다.
   > > 현재 category 값이 무엇인지에 따라 요청할 주소가 동적으로 바뀌고 있습니다. category 값이 all이라면 query 값을 공백으로 설정하고, all이 아니라면 "&category=카테고리" 형태의 문자열을 만들도록 했습니다. 그리고 이 쿼리를 요청할 때 주소에 포함시켜 주었습니다.
   > > 추가로 category 값이 바뀔 때마다 뉴스를 새로 불러와야 하기 때문에 useEffect의 의존 배열(두번째 파라미터로 설정하는 배열)에 category를 넣어줘야 합니다.

4. 리액트 라우터 적용하기

   > > 기존에는 카테고리 값을 useState로 관리했는데요. 이번에는 이 값을 리액트 라우터의 URL 파라미터를 사용하여 관리해 보겠습니다.

# 데이터 흐름도

1. index.js

   > > react-router-dom의 기능을 사용하기 위해 BrowserRouter로 App을 감싸주었다.

2. App.js

   > > 뉴스뷰어 어플리케이션은 특정 사이트에서 제공하는 API를 사용하여 뉴스를 카테고리 별로 보여주는 형식을 띕니다.
   > > NewsPage를 컴포넌트로 URL 파라미터 형식으로 받아 라우팅처리를 합니다.

3. NewsPage.js

   > > Categories.js 와 NewsList.js를 컴포넌트로 가집니다.
   > > Categories는 안에 6개의 카테고리를 배열로 가지고 있고, 이 값을 어떻게 매핑하느냐에 따라 보여지는 정보가 달라집니다.
   > > NewsList는 props로 category를 받습니다.
   > > 이 카테고리는 (사용자에 의해 선택되는) URL 파라미터로 받는 카테고리 이거나, (초깃값에 의해 선택되는) 'all' 카테고리를 변수로 받습니다.

4. Categories.js

   > > 이 파일은 const Categories = [ . . . ] 배열로 하여금 선택되는 카테고리에 맞춰 라우팅처리를 하는 역할을 합니다.
   > > Route의 to = "/" 기능을 사용하여 선택된 카테고리에 따라 화면에 나타날 정보를 표시합니다.

5. NewsList.js

   > > 이 파일은 axios 모듈을 사용하여 제공되는 API를 비동기 처리하여 받아옵니다.
   > > articles, loading을 state로 관리합니다.
   > > useEffect()를 통해 비동기 처리에 대한 상태변화를 감지합니다.
   > > props로 받은 category의 변화되는 값을 저장하기 위한 query 변수를 갖습니다.
   > > 이 쿼리 변수를 api에 적용하여 categories 별 데이터를 전달 받을 수 있습니다.
   > > 이렇게 전달 받은 response의 해당 articles를 setArticles를 통해 articles애 저장합니다. (useState())
   > > 후에 모든 과정이 유효하다면, 이 articles를 매핑하여 NewsItem 컴포넌트를 통해 화면에 보여줍니다.

6. NewsItem.js

   > > NewsList가 실질적으로 보여주고자 하는 정보들이 담겨있습니다.
   > > article을 props로 받아와 사용하게 되는데, 초기에 api값을 받아올 때 있었던 속성들을 지정하여 사용합니다. (title, description, url, urlToImage)
