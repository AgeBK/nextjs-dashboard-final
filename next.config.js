module.exports = {
  async redirects() {
    return [
      {
        source: '/manage/delete',
        destination: '/manage',
        permanent: true,
      },
    ];
  },
};

// TODO: ?? above isn't standard
