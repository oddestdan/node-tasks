import api from '@/services/api';

export default {
  fetchUsers() {
    return api().get('/api/users', {
      // headers: { Authorization: 'JWT ' + this.$store.state.token },
      headers: {
        Authorization:
          // eslint-disable-next-line
          'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikplc3VzIiwicGFzc3dvcmQiOiJjaHJpc3QiLCJpYXQiOjE1ODUxNDM3NzAsImV4cCI6MTU4NTc0ODU3MH0.cqGlft0o9OaJ_EbxLyjs4xzY1MNpX8jy-8e9OGNEdVw',
      },
    });
  },
};
