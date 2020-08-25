# JPA (Java Persistence API)
자바 ORM 기술에 대한 API 표준 명세로, Java에서 제공하는 API이다.  
자바 플랫폼 SE와 자바 플랫폼 EE를 사용하는 응용프로그램에서 관계형 데이터베이스의 관리를 표현하는 자바 API이다.  
즉, JPA는 ORM을 사용하기 위한 표준 인터페이스를 모아둔 것이다.  
기존에 EJB에서 제공되던 엔터티 빈(Entity Bean)을 대체하는 기술이다.  
JPA에서는 JDBC( Mybatis )를 사용했을 때와 달리 연관 관계에 있는 상대 테이블의 PK를 멤버변수로 갖지 않고, 엔티티 객체 자체를 통째로 참조한다.  
JPA 구성 요소 (세 가지)  
    1) javax.persistance 패키지로 정의된 API 그 자체  
    2) JPQL(Java Persistence Query Language)  
    3) 객체/관계 메타데이터  
사용자가 원하는 JPA 구현체를 선택해서 사용할 수 있다.  
JPA의 대표적인 구현체로는 Hibernate, EclipseLink, DataNucleus, OpenJPA, TopLink Essentials 등이 있다.  
이 구현체들을 ORM(Object-Relational Mapping) Framework라고 부른다.  
https://gmlwjd9405.github.io/2018/12/25/difference-jdbc-jpa-mybatis.html  

## Entity
Entity는 실체, 객체라는 의미로 실무적으로는 엔티티라고 부른다.  
즉 업무에 필요하고 유용한 정보를 저장하고 관리하기 위한 집합적인 것으로 설명할 수 있다.  
EX) 학생이라는 엔티티는 학번, 이름, 학점, 전공 등의 속성으로 특징지어질 수 있다.  
CF) Dto와 Entity를 분리해서 사용하는 이유  
    1.View에서 표현하는 속성값들은 요청에 따라 계속 달라질 수 있는데, 그 때마다 Entity의 속성값들이 변하게 되면  
      영속성 모델을 표현한 Entity의 순수성이 모호해짐.  
    2.영역간 불필요한 속성값들의 전달로 불필요한 방어 및 체크로직이 생겨날 수 있고 API서비스의 경우, 명세가 달라지는 큰 이슈가 발생.  
    
##### ID
기본키(primary Key)를 가지는 변수를 명시하는 데 사용되는 어노테이션.  

##### GeneratedValue
```@GeneratedValue ``` 기본 키의 값을 자동으로 생성하기 위해 명시하는 데 사용되는 어노테이션  
자동 생성 전략은 크게 (Auto,IDENTITY, SEQUENCE, TABLE)이 있음.  
<br/>
> AUTO(default)       JPA 구현체가 자동으로 생성 전략을 결정한다.  
> IDENTITY            기본키 생성을 데이터베이스에 위임한다. Ex) Mysql 경우 Auto-increment를 사용하여 기본키를 생성할 경우  
> SEQUENCE            데이터베이스의 특별한 오브젝트 시퀀스를 사용하여 기본키를 생성한다.
> TABLE               데이터베이스에 키 생성 전용 테이블을 하나 만들고 이를 사용하여 기본키를 생성한다.

##### Column
변수와 실제 데이터베이스에 있는 컬럼 명이 다르다면 ``` Column(name = "xxxx") ```와 같은 형식으로 작성할 수 있음.  
이외 ```(lenght= 20, nullable = false) ```와 같이 컬럼의 속성도 지정 가능함.  
Cf) 속성이 지정이 가능하지만 실제 데이터베이스에 지정하는 게 아닌 것 같고  
    속성과 같지 않으면 Entity자체에서 넘어가면 팅겨내는 방식인 것 같음..(내 생각)  
