# JWT(JSON Web Token)

### Header
> alg : 알고리즘
> typ : 타입 

### Payload
> aud : 토큰을 사용할 수신자
> exp : 만료시간
> sub : Claim의 주제로 토큰이 갖는 문맥을 의미
> iss : 토큰을 발급한 발급자
> nbf : 이 시간 이전에는 토큰을 처리하지 않아야 함을 의미
> iat : 토큰이 발급된 시간
> jti : JWT ID 토큰에 대한 식별자

Claim set은 암호화하지 않는다. 그러므로 중요한 데이터를 넣으면 안되고 최소한의 정보만 담아야 한다.

### Verify Signature
Header와 Claim Set을 base64로 인코딩해서 만든 두 값을 마침표로 이어 붙이고 헤더에서 지정한 알고리즘으로 인코딩하면 시크릿 키를 암호화해서 Signature을 만든다.

