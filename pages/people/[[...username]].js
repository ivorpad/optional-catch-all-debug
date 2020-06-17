export default function index({user}) {
 return (
   <>
     <h1>{user?.login}</h1>
     <img src={user?.avatar_url} alt={user?.login} />
   </>
 );
}

export async function getStaticPaths() {

  const users = await fetch(`https://api.github.com/users`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  })
    .then((r) => r.json())
    .then((r) => r);

    const paths = users.map((user) => ({
      params: { username: [user.login] },
    }));


  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const user = await fetch(`https://api.github.com/users/${params.username}`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  })
    .then((r) => r.json())
    .then((r) => r);

  return {
    props: { user },
  };
}
