# Associative Relation Mapping
https://velog.io/@conatuseus/%EC%97%B0%EA%B4%80%EA%B4%80%EA%B3%84-%EB%A7%A4%ED%95%91-%EA%B8%B0%EC%B4%88-1-i3k0xuve9i  - 설명을 구체적으로 
https://victorydntmd.tistory.com/208 - 한번에 깔끔하게 정리됨.

#### 매핑하기전 생각해야 하는것!
+ 방향  
  + **단방향(객체 연관관계)** - 회원 → 팀 한 쪽만 참조  
  + **양방향(테이블 연관관계)** - 회원 → 팀 & 팀 → 회원 참조  
+ 다중성  
  + OneToOne, OneToMany, ManyToOne, ManyToMany
    + **OneToOne** - 사람과 주민등록번호
    + **OneToMany** - 공포라는 소재에 영화,게임,소설,사진등 혹은 영화와 영화장르  
    + **ManyToOne** - 