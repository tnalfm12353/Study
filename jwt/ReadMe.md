이전에는 단순히 로그인 리퀘스트를 보내면 DB 조회후 간단한 데이터를 리스폰해서 섹션에 담아 사용했음.<br/>
하지만 보안이란 것을 조금 알게 되었음.</br>
그래서 spring security를 조금 찾아 사용하였는데,<br/>
spring security는 form 형태의 로그인리퀘스트를 받지만 내가 만들고 있는 commuity는front를 react로 사용해 axios로 리퀘스트보내야함.<br/>
그래서 data를 폼형태로 만들고 header에 context-type은 x-www-form-urlencoded로 보냈지만 로그인이 안됐음.</br>
그래서 결국에 많은 사람들이 사용하는 JSON web Token을 사용하자라는 생각이 들었음.<br/>
그런데 spring security도 잘 모르고 jwt도 간단하게 무엇인지만 알지 어떻게 사용하는지를 몰라 너무 어려움..<br/>
그래서 차근차근 api를 뒤져보고 정리하기 위해 jwt폴더를 만듦.