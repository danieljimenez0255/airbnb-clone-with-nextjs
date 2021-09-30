export const CustomGitHubProvider = (options) => {
  return {
    id: "githubCustom",
    name: "GitHub",
    type: "oauth",
    authorization:
      "https://github.com/login/oauth/authorize?scope=read:user+user:email",
    token: "https://github.com/login/oauth/access_token",
    userinfo: "https://api.github.com/user",
    async profile(profile, token) {
      const res = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `token ${token.access_token}`,
        },
      });
      const emails = await res.json();
      if (!emails || emails.length === 0) {
        return;
      }
      // Sort by primary email - the user may have several emails, but only one of them will be primary
      const sortedEmails =
        emails.length > 2
          ? emails.sort((a, b) => b.primary - a.primary)
          : emails;
      return {
        id: profile.id.toString(),
        name: profile.name || profile.login,
        email: sortedEmails[0].email,
        image: profile.avatar_url,
      };
    },

    options,
  };
};
