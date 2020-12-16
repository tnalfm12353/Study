### https://velog.io/@hellas4/Security-%EA%B8%B0%EB%B3%B8-%EC%9B%90%EB%A6%AC-%ED%8C%8C%EC%95%85%ED%95%98%EA%B8%B0-%EC%9D%B4%EB%A1%A0%ED%8E%B8

### https://docs.spring.io/spring-security/site/docs/current/reference/html5/#servlet-authentication-daoauthenticationprovider

# SpringSecurity Authentication Architecture

1. client에서 id, password 정보를 request함  
2. AuthenticationFilter가 HttpServletRequest에서 사용자가 보낸 아이디와 패스워드를 인터셉트한다.  
    > filter은 client가 보낸 값을 servlet에 보내기전 말 그대로의 filter 작업을 한다.  
    * Digest Authentication - You should not use Digest Authentication in modern applications because it is not considered secure.   
    * AbstractAuthenticationProcessingFilter - 인증  
    * UsernamePasswordAuthenticationFilter - loginform submission. 디폴트 이름을 (username, password)Parameter로 바꿀 수 있음.  
    * BasicAuthenticationFilter - Header에 username, password를 담아 보내 서버가 읽어 결과를 SecurityContextHolder에 담음.  
3. AuthenticationFilter에서 인증용 객체(UsernamePassowordAuthenticationToken)을 전달 받음. 인증용 객체가 id,password를 적출함.  
4. 위 객체를 인증하기 위해 인증용 객체(UsernamePassowordAuthenticationToken)를 AuthenticationProvider로 보냄.  
5. AuthenticationProvider 인터페이스의 authenticate() 메소드를 오버라이딩하여 화면에 입력한 로그인 값을 Authentication 파라미터로 가져옴.  
6. AuthenticationProvider 인터페이스에서 DB에 저장된 데이터를 가져올려면 UserDetailsService 인터페이스를 사용해야함.  
7. UserDetailsService 인터페이스는 화면에 입력된 이용자의 이름(username)을 가지고 loadUserByUsername() 메소드를 호출하여 DB에 있는 값을 UserDetails형으로 가져옴. 만약 DB에 값이 없다면 예외를 던짐.  
8. 로그인 정보 값을 비교 후 일치하면 Authentication 객체 리턴, 일치하지 않으면 예외를 던짐.  
9. Authenticationfilter에서 리턴 받은 Authentication 객체를 SecurityContextHolder에 담아 AuthenticationSuccessHandle을 실행함.  