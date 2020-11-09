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
