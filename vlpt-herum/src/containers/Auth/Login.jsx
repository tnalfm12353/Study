import React from 'react';
import {AuthContent, InputWithLabel, AuthButton, RightAlignedLink,AuthError} from '../../components/Auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../redux/modules/auth';
import * as userActions from '../../redux/modules/user';
import storage from '../../lib/storage';

class Login extends React.Component{
    
    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('login')
    }

    handleChange = (e) =>{
        const {AuthActions} = this.props;
        const {name,value} = e.target;

        AuthActions.changeInput({
            name,
            value,
            form:'login'
        });
    }

    setError = (message) =>{
        const {AuthActions} =this.props;
        AuthActions.setError({
            form: 'login',
            message
        });
        return false;
    }

    
    handleLocalLogin = async () => {
        const { form, AuthActions, UserActions, history } = this.props;
        const { email, password } = form.toJS();

        try {
            await AuthActions.localLogin({email, password});
            const loggedInfo = this.props.result.toJS();

            UserActions.setLoggedInfo(loggedInfo);
            history.push('/');
            storage.set('loggedInfo', loggedInfo);

        } catch (e) {
            console.log('a');
            this.setError('잘못된 계정정보입니다.');
        }
    }

    render(){
        //form에서 email과 password 값을 읽어옴
        const {email,password} =this.props.form.toJS();
        const { handleChange, handleLocalLogin } =this;
        const { error } = this.props;
        return(
            <AuthContent title="로그인">
                <InputWithLabel 
                    label="이메일"
                    name="email" 
                    placeholder="이메일"
                    value={email}
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label="비밀번호" 
                    name="password" 
                    placeholder="비밀번호" 
                    type="password"
                    value={password}
                    onChange={handleChange}    
                />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
                <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
            </AuthContent>
        )
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['login', 'form']),
        error: state.auth.getIn(['login','error']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions,dispatch),
        UserActions: bindActionCreators(userActions,dispatch)
    })
)(Login);