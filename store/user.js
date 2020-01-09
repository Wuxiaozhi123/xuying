// 用户管理
export const state= {
    userInfo:{     
        user:{}
    }
}
export const mutations={
    // 保持用户信息到state
    setUserInfo(state, data){
        state.userInfo=data;
    },
    // 清除用户数据
    cleanUserInfo(state,info){
        if(process.browser){
            localStorage.removeItem('userInfo');
        }
        state.userInfo={};
    }
};
export const actions ={
    // 登入 
    login({commit},data){
        return this.$axios({
            url:'/accounts/login',
            method:'POST',
            data:data
        }).then(res=>{ 
            const data = res.data;
            commit('setUserInfo',data);
            return data;
        })
    },
    // 发送手机验证码
    sendCaptcha(store,data){
        return this.$axios({
            url:'/captchas',
            method:'POST',
            data:{
                tel:data
            }
        })
    },
    // 注册
    register(store,data){
        return this.$axios({
            url:'/accounts/register',
            method:'POST',
            data
        }).then(res=>{
            this.$router.back();
            store.commit('setUserInfo',res.data);
            return true;
        })
    }
}
